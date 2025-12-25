pipeline {
    agent any
    
    environment {
        AWS_ACCESS_KEY_ID     = credentials('aws-access-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
        AWS_DEFAULT_REGION    = 'us-east-1'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo '========================================='
                echo 'Stage 1: Checking out code from repository'
                echo '========================================='
                checkout scm
            }
        }
        
        stage('Infrastructure Security Scan') {
            steps {
                script {
                    echo '========================================='
                    echo 'Stage 2: Running Trivy Security Scan on Terraform'
                    echo '========================================='
                    
                    dir('terraform') {
                        // Run Trivy scan
                        def scanExitCode = sh(
                            script: 'trivy config --severity HIGH,CRITICAL --exit-code 1 .',
                            returnStatus: true
                        )
                        
                        // Generate detailed report
                        sh 'trivy config --format json --output trivy-report.json . || true'
                        sh 'trivy config --severity HIGH,CRITICAL . | tee security-scan-report.txt || true'
                        
                        // Archive reports
                        archiveArtifacts artifacts: 'trivy-report.json,security-scan-report.txt', allowEmptyArchive: true
                        
                        if (scanExitCode != 0) {
                            echo '========================================='
                            echo '⚠️  SECURITY VULNERABILITIES DETECTED!'
                            echo '========================================='
                            echo 'Critical or High severity issues found in Terraform code.'
                            echo 'Please review the security-scan-report.txt in Jenkins artifacts.'
                            echo 'Fix the issues and re-run the pipeline.'
                            echo '========================================='
                            
                            error('Security scan failed! Fix vulnerabilities before proceeding.')
                        } else {
                            echo '✅ Security scan passed! No critical vulnerabilities found.'
                        }
                    }
                }
            }
        }
        
        stage('Terraform Init') {
            steps {
                echo '========================================='
                echo 'Stage 3: Initializing Terraform'
                echo '========================================='
                dir('terraform') {
                    sh 'terraform init'
                }
            }
        }
        
        stage('Terraform Plan') {
            steps {
                echo '========================================='
                echo 'Stage 4: Running Terraform Plan'
                echo '========================================='
                dir('terraform') {
                    sh 'terraform plan -out=tfplan'
                    sh 'terraform show -no-color tfplan > terraform-plan.txt'
                    archiveArtifacts artifacts: 'terraform-plan.txt'
                }
            }
        }
        
        stage('Approval') {
            steps {
                echo '========================================='
                echo 'Waiting for manual approval to apply changes...'
                echo '========================================='
                input message: 'Approve Terraform Apply?', ok: 'Deploy to AWS'
            }
        }
        
        stage('Terraform Apply') {
            steps {
                echo '========================================='
                echo 'Stage 5: Applying Terraform Changes'
                echo '========================================='
                dir('terraform') {
                    sh 'terraform apply -auto-approve tfplan'
                }
            }
        }
    }
    
    post {
        always {
            echo '========================================='
            echo 'Pipeline execution completed'
            echo '========================================='
        }
        success {
            echo '✅ Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed! Check logs for details.'
        }
    }
}