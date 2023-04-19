//设置镜像版本
tag ="latest"

//如果是本地私有镜像仓库，如Harbor，需要设置repositoryUrl和projectName
//如果是dockerhub,则不需要设置repository
repositoryUrl="9.197.4.240:85"
projectName="microservice-demo"

//Windows节点下这个变量中俄路径隔离符会被去除
//scannerHome = tool name: 'sonarqube-scanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
scannerHome = "C:/ProgramData/Jenkins/.jenkins/tools/hudson.plugins.sonar.SonarRunnerInstallation/sonarqube-scanner"

pipeline {
    agent {
        label "master"
    }

    stages{
        stage('Pull Code') {
            steps{
                //checkout scmGit(branches: [[name: "*/${Branch}"]], extensions: [], userRemoteConfigs: [[credentialsId: 'f2f81612-da80-4372-9d5f-f19bb42c442b', url: 'https://github.com/bjaimm/myspringcloud_parent.git']])
                checkout scmGit(branches: [[name: "*/${Branch}"]], extensions: [], userRemoteConfigs: [[credentialsId: 'eb5f023a-abf9-4307-90ec-2c949f2b00ba', url: 'git@github.com:bjaimm/vue-demo.git']])
                /*dir("${ServiceName}") {
                    sh "mkdir -p target/classes"
                }*/
            }
        }

        stage("Install modules and Build project"){

            steps{
                //安装更新modules
                sh "npm install"
                //编译工程，生成到dist目录
                sh "npm run build"
            }
        }
        

     }
}
