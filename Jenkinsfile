rpipeline {
    agent { docker { image 'node:12.10' } }
    stages {
        stage('build') {
            steps {
                sh 'forever start bin/www'
            }
        }
    }
}
