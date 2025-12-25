# DevOps Assignment - LenDenClub MERN Task Manager

## 🎯 Project Overview

This project demonstrates a complete DevOps workflow for deploying a MERN (MongoDB, Express, React, Node.js) stack application to AWS using Infrastructure as Code (Terraform), CI/CD automation (Jenkins), and AI-driven security analysis.

**Live Application URL:** http://3.236.188.253

**Key Features:**

- Automated CI/CD pipeline using Jenkins
- Infrastructure as Code with Terraform
- Security scanning with Trivy
- AI-driven security risk analysis
- Containerized deployment with Docker
- Cloud deployment on AWS EC2

---

## 🏗️ Architecture

### System Architecture

\\\
┌─────────────────────────────────────────────────────────────────┐
│ Developer │
│ ↓ │
│ Push code to GitHub │
└─────────────────────────────────────────────────────────────────┘
↓
┌─────────────────────────────────────────────────────────────────┐
│ Jenkins CI/CD Pipeline │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ 1. Checkout Code from GitHub │ │
│ └──────────────────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ 2. Security Scan (Trivy) - Terraform Config │ │
│ │ - Scan for HIGH/CRITICAL vulnerabilities │ │
│ │ - Apply .trivyignore exceptions │ │
│ └──────────────────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ 3. Terraform Init & Plan │ │
│ └──────────────────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ 4. Manual Approval Gate │ │
│ └──────────────────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ 5. Terraform Apply - Deploy to AWS │ │
│ └──────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
↓
┌─────────────────────────────────────────────────────────────────┐
│ AWS Cloud Infrastructure │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ VPC (10.0.0.0/16) │ │
│ │ ├── Public Subnet (10.0.1.0/24) │ │
│ │ ├── Internet Gateway │ │
│ │ └── Route Table │ │
│ └──────────────────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ EC2 Instance (t3.micro) │ │
│ │ ├── Amazon Linux 2023 │ │
│ │ ├── Docker & Docker Compose installed │ │
│ │ ├── 30GB EBS encrypted volume │ │
│ │ └── IMDSv2 enforced │ │
│ └──────────────────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ Security Group │ │
│ │ ├── Port 22 (SSH) - Admin IP only (152.58.2.223/32) │ │
│ │ ├── Port 80 (HTTP) - Public (0.0.0.0/0) │ │
│ │ ├── Port 443 (HTTPS) - Public (0.0.0.0/0) │ │
│ │ └── Port 5000 (Backend API) - VPC only (10.0.0.0/16) │ │
│ └──────────────────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ S3 Bucket (AES256 encrypted) │ │
│ │ └── Public access blocked │ │
│ └──────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
↓
┌─────────────────────────────────────────────────────────────────┐
│ MERN Application (Docker Containers) │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ Frontend (React + Nginx) - Port 80 │ │
│ └──────────────────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ Backend (Node.js + Express) - Port 5000 │ │
│ └──────────────────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ Database (MongoDB) - Port 27017 │ │
│ └──────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
↓
End Users (Public Internet)
\\\

### Network Architecture

- **VPC**: Custom VPC (10.0.0.0/16) with Internet Gateway
- **Subnet**: Public subnet (10.0.1.0/24) in us-east-1a
- **Security**: Network ACLs and Security Groups for defense-in-depth
- **Routing**: Public route table with 0.0.0.0/0 → Internet Gateway

---

## ☁️ Cloud Provider

**Amazon Web Services (AWS)**

**Region:** us-east-1 (US East - N. Virginia)

**Services Used:**

- **EC2**: t3.micro instance for application hosting
- **VPC**: Isolated network environment
- **S3**: Encrypted storage bucket
- **EBS**: 30GB encrypted volume for EC2 root device
- **Security Groups**: Network-level firewall
- **IAM**: Access management (via AWS credentials in Jenkins)

**Why AWS?**

- Industry-leading cloud provider with 33% market share
- Free tier eligible for learning projects
- Extensive documentation and community support
- Terraform has mature AWS provider

---

## 🛠️ Tools and Technologies

### Infrastructure & Deployment

| Tool               | Version         | Purpose                       |
| ------------------ | --------------- | ----------------------------- |
| **Terraform**      | v1.10.5         | Infrastructure as Code (IaC)  |
| **Jenkins**        | Latest (Docker) | CI/CD automation server       |
| **Docker**         | 27.5.1          | Application containerization  |
| **Docker Compose** | v5.0.1          | Multi-container orchestration |
| **AWS CLI**        | v2              | AWS resource management       |

### Security & Scanning

| Tool                | Version | Purpose                         |
| ------------------- | ------- | ------------------------------- |
| **Trivy**           | Latest  | Infrastructure security scanner |
| **AI (Perplexity)** | -       | Security risk analysis          |

### Application Stack (MERN)

| Technology     | Purpose                    |
| -------------- | -------------------------- |
| **MongoDB**    | NoSQL database             |
| **Express.js** | Backend API framework      |
| **React**      | Frontend UI library        |
| **Node.js**    | JavaScript runtime         |
| **Nginx**      | Reverse proxy for frontend |

### Development Tools

| Tool           | Purpose                  |
| -------------- | ------------------------ |
| **Git**        | Version control          |
| **GitHub**     | Code repository hosting  |
| **VS Code**    | Code editor              |
| **PowerShell** | Scripting and automation |

---

## 🔒 Security Report: Before & After

### Before: Initial Security Scan (FAILED ❌)

**Build #2 - December 24, 2025**

Trivy detected **5 critical/high vulnerabilities** in Terraform configuration:

| ID           | Severity | Issue                                          | Location        |
| ------------ | -------- | ---------------------------------------------- | --------------- |
| AVD-AWS-0104 | CRITICAL | Security group allows egress to 0.0.0.0/0      | main.tf:103     |
| AVD-AWS-0107 | CRITICAL | HTTP ingress from public internet (0.0.0.0/0)  | main.tf:77      |
| AVD-AWS-0107 | CRITICAL | HTTPS ingress from public internet (0.0.0.0/0) | main.tf:86      |
| AVD-AWS-0132 | HIGH     | S3 bucket not using customer-managed KMS keys  | main.tf:179-187 |
| AVD-AWS-0164 | HIGH     | Subnet auto-assigns public IP addresses        | main.tf:31      |

**Pipeline Result:** ❌ FAILED

**Screenshot:** \screenshots/01-jenkins-initial-scan-failure.png\

---

### After: Final Security Scan (PASSED ✅)

**Build #5 - December 25, 2025**

After AI analysis and implementing \.trivyignore\ with documented exceptions:

**Trivy Result:** ✅ **0 vulnerabilities** (all documented as acceptable risks)

**Security Controls Implemented:**

- ✅ EBS volume encryption enabled
- ✅ S3 bucket encryption (AES256) enabled
- ✅ S3 public access blocked (all 4 settings)
- ✅ IMDSv2 enforced on EC2 instance
- ✅ SSH access restricted to admin IP only (152.58.2.223/32)
- ✅ Backend API restricted to VPC (10.0.0.0/16)
- ✅ Network segmentation with security groups

**Message:**
\\\
✅ Security scan passed!
All critical vulnerabilities have been addressed or documented.
\\\

**Pipeline Result:** ✅ SUCCESS

**Screenshot:** \screenshots/02-jenkins-final-scan-success.png\

---

## 🤖 AI Usage Log (Mandatory)

### AI Tool Used

**Perplexity AI** - Advanced AI assistant for security analysis

### The Exact AI Prompt Used

\\\
I have a Terraform configuration for deploying a public web application (MERN stack) on AWS.
The Trivy security scanner flagged 5 vulnerabilities:

1. Egress to 0.0.0.0/0 (CRITICAL)
2. HTTP ingress from 0.0.0.0/0 (CRITICAL)
3. HTTPS ingress from 0.0.0.0/0 (CRITICAL)
4. S3 not using customer-managed KMS keys (HIGH)
5. Subnet auto-assigns public IPs (HIGH)

This is a PUBLIC web application that needs to be accessible from the internet.

Please analyze each vulnerability and tell me:

1. Which vulnerabilities are ACCEPTABLE for a public web app?
2. Which ones need to be fixed?
3. How to document acceptable exceptions using .trivyignore?
   \\\

---

### Summary of Identified Risks

#### Risk #1: HTTP/HTTPS Ingress from Public Internet (CRITICAL)

**AI Analysis:** ✅ **ACCEPTABLE** for public web applications

- **Rationale**: Public web apps MUST be accessible from anywhere (0.0.0.0/0)
- **Context**: This is standard for all public websites (Google, Amazon, GitHub)
- **Mitigation**: Only ports 80/443 exposed; SSH restricted to admin IP

#### Risk #2: Egress to Public Internet (CRITICAL)

**AI Analysis:** ✅ **ACCEPTABLE** for functional servers

- **Rationale**: EC2 instance needs outbound access to:
  - Download security patches and OS updates
  - Install Docker and application dependencies
  - Pull Docker images from Docker Hub
  - Connect to external APIs if needed
- **Risk Level**: LOW - Outbound from trusted EC2, not inbound

#### Risk #3: Auto-Assign Public IP (HIGH)

**AI Analysis:** ✅ **ACCEPTABLE** for public web servers

- **Rationale**: EC2 instance MUST have public IP to serve HTTP traffic
- **Alternative**: Using load balancer adds cost/complexity for learning project

#### Risk #4: S3 Using AWS-Managed Keys vs Customer-Managed KMS (HIGH)

**AI Analysis:** ✅ **ACCEPTABLE** for non-compliance workloads

- **Rationale**: AES256 provides strong encryption at rest
- **Context**: Customer-managed KMS only required for HIPAA/PCI compliance
- **Security**: Data is encrypted; only key management differs

---

### How AI-Recommended Changes Improved Security

#### 1. **Risk Prioritization**

AI helped distinguish between:

- **Real vulnerabilities** → Fixed (EBS encryption, IMDSv2, S3 encryption)
- **False positives** → Documented (HTTP access, egress traffic)

#### 2. **Implemented Real Security Fixes**

Based on AI guidance, we implemented:

| Security Control | Before            | After            | Impact                     |
| ---------------- | ----------------- | ---------------- | -------------------------- |
| EBS Encryption   | ❌ Not configured | ✅ Encrypted     | Data at rest protected     |
| S3 Encryption    | ❌ No encryption  | ✅ AES256        | Bucket data encrypted      |
| S3 Public Access | ⚠️ Not blocked    | ✅ All blocked   | No accidental exposure     |
| IMDSv2           | ❌ Optional       | ✅ Required      | SSRF protection            |
| SSH Access       | ⚠️ Broad access   | ✅ Admin IP only | Reduced attack surface     |
| Backend API      | ⚠️ Public         | ✅ VPC-only      | Internal service protected |

#### 3. **Documented Acceptable Risks**

Created \ erraform/.trivyignore\ with explanations:

\\\

# ACCEPTABLE: HTTP/HTTPS from public internet

# Rationale: Public web application requirement

AVD-AWS-0107

# ACCEPTABLE: Egress to public internet

# Rationale: Required for package updates and Docker images

AVD-AWS-0104

# ACCEPTABLE: Auto-assign public IPs

# Rationale: Public web server architectural requirement

AVD-AWS-0164

# ACCEPTABLE: S3 AWS-managed encryption

# Rationale: AES256 sufficient for non-compliance workloads

AVD-AWS-0132
\\\

#### 4. **Defense-in-Depth Strategy**

AI recommended layered security:

- ✅ Network layer: Security groups with least privilege
- ✅ Compute layer: IMDSv2, encrypted EBS, restricted SSH
- ✅ Storage layer: S3 encryption + public access block
- ✅ Documentation layer: Explicit risk acceptance in .trivyignore

#### 5. **Production-Ready Security Posture**

**Final Result:**

- **Security scan**: ✅ PASSED
- **Real vulnerabilities**: ✅ FIXED
- **False positives**: ✅ DOCUMENTED
- **Compliance**: ✅ AWS Well-Architected Framework aligned

**Security Improvement:** 🟥 **5 Critical Issues** → 🟩 **0 Issues, Production-Ready**

---

## 📸 Screenshots

### 1. Jenkins Pipeline Success

![Jenkins Pipeline Success](screenshots/02-jenkins-final-scan-success.png)

### 2. Initial Security Scan (Before)

![Security Scan Failure](screenshots/01-jenkins-initial-scan-failure.png)

### 3. Final Security Scan (After)

![Security Scan Success](screenshots/02-jenkins-final-scan-success.png)

### 4. Terraform Deployment Outputs

![Terraform Outputs](screenshots/03-terraform-outputs.png)

### 5. Application Running on AWS Cloud

![Application Live](screenshots/04-application-running-cloud.png)

**Live URL:** http://3.236.188.253

---

## 🎥 Video Demonstration

**Video Link:** [https://drive.google.com/file/d/1hYvJAiWd-oUzhA59ql-nNw5-lWmv9_oo/view?usp=sharing]

**Video Contents (5-10 minutes):**

1. ✅ Jenkins pipeline execution from start to finish
2. ✅ Security scan results (Trivy)
3. ✅ Terraform deployment process
4. ✅ AWS infrastructure verification (EC2, VPC, S3)
5. ✅ Application running on public IP (http://3.236.188.253)
6. ✅ Testing application functionality (add/delete tasks)

---

## 🚀 Getting Started

### Prerequisites

- AWS Account with access keys
- Jenkins server (Docker-based)
- Terraform v1.10+
- Git
- Docker & Docker Compose

### Local Development

\\\ash

# Clone repository

git clone https://github.com/Krish171003/LenDenClub.git
cd LenDenClub

# Start application locally

docker-compose up -d

# Access at http://localhost:80

\\\

### Deploy to AWS

\\\ash

# 1. Configure AWS credentials in Jenkins

# 2. Create Jenkins pipeline job pointing to this repository

# 3. Run pipeline

# 4. Approve Terraform apply step

# 5. Access application at EC2 public IP

\\\

---

## 📁 Repository Structure

\\\
LenDenClub/
├── frontend/ # React frontend
│ ├── src/
│ ├── Dockerfile
│ └── package.json
├── backend/ # Node.js backend
│ ├── server.js
│ ├── Dockerfile
│ └── package.json
├── terraform/ # Infrastructure as Code
│ ├── main.tf # Core infrastructure
│ ├── variables.tf # Variable definitions
│ ├── outputs.tf # Output values
│ └── .trivyignore # Security scan exceptions
├── docs/
│ └── ai-usage-log.md # Detailed AI analysis log
├── screenshots/ # Assignment screenshots
│ ├── 01-jenkins-initial-scan-failure.png
│ ├── 02-jenkins-final-scan-success.png
│ ├── 03-terraform-outputs.png
│ └── 04-application-running-cloud.png
├── Jenkinsfile # CI/CD pipeline definition
├── docker-compose.yml # Multi-container orchestration
└── README.md # This file
\\\

---

## 🏆 Key Achievements

- ✅ **Automated CI/CD**: Jenkins pipeline with security scanning
- ✅ **Infrastructure as Code**: Reproducible AWS infrastructure
- ✅ **Security-First Approach**: AI-driven vulnerability analysis
- ✅ **Cloud Deployment**: Production-ready MERN stack on AWS
- ✅ **Documentation**: Comprehensive security risk analysis

---

## 👨‍💻 Author

**Krish**

- GitHub: [@Krish171003](https://github.com/Krish171003)
- Project: DevOps GET 2026 Assignment

---

## 📜 License

This project is for recruitment purposes as part of the LenDen Club Recruitment Process 2026 .

---

## 🙏 Acknowledgments

- **Trivy** for security scanning
- **HashiCorp** for Terraform
- **Jenkins** community for CI/CD automation
- **Perplexity AI** for security analysis guidance
- **AWS** for cloud infrastructure
