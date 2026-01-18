pipeline {
    agent any

    environment {
        NODE_ENV = "ci"
    }

    stages {

        stage("Checkout") {
            steps {
                checkout scm
            }
        }

        /* ========= CI (ALL BRANCHES) ========= */

        stage("Backend Install") {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage("Frontend Install") {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage("Frontend Build") {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        /* ========= PROD (MAIN ONLY) ========= */

        stage("Approve Production Deployment") {
            when {
                branch 'main'
            }
            steps {
                input message: "Deploy to PRODUCTION?"
            }
        }

        stage("Deploy Backend") {
            when {
                branch 'main'
            }
            steps {
                sh '''
                  export NODE_ENV=production
                  cd backend
                  pm2 restart backend || pm2 start server.js --name backend
                '''
            }
        }

        stage("Deploy Frontend") {
            when {
                branch 'main'
            }
            steps {
                sh '''
                  mkdir -p /var/www/html_new
                  rm -rf /var/www/html_new/*
                  cp -r frontend/build/* /var/www/html_new/
                  mv /var/www/html /var/www/html_old || true
                  mv /var/www/html_new /var/www/html
                '''
            }
        }

        stage("Post Deploy Health Check") {
            when {
                branch 'main'
            }
            steps {
                sh 'curl http://localhost:5000/api/health'
            }
        }
    }

    post {
        success {
            echo "✅ SUCCESS | Branch: ${env.BRANCH_NAME}"
        }
        failure {
            echo "❌ FAILED | Branch: ${env.BRANCH_NAME}"
        }
    }
}
