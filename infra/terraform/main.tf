terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.8"
    }
  }
}

provider "aws" {
	profile = "terraform"
	region = "ap-northeast-1"
}

resource "aws_instance" "hello-world" {
	# you can get from management console via. EC2 -> instance -> launch
	ami = "ami-0ffac3e16de16665e"
	instance_type = "t2.micro"
	tags = {
		Name = "HelloWorld"
	}
	user_data = <<EOF
	#!/bin/bash
	amazon-linux-extras install -y nginx1.12
	systemctl start nginx
	EOF
}

