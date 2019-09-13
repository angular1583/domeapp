pipeline {
    agent { docker { image 'node:12.10' } }
    stages {
        stage('build') {
            steps {
                sh 'npm start'
            }
        }
    }
}
