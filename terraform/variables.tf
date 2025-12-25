variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "devops-mern-app"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "admin_ip" {
  description = "Admin IP address for SSH access (format: x.x.x.x/32)"
  type        = string
  default     = "0.0.0.0/0" # Will be fixed later
}