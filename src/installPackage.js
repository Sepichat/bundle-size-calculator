const rimraf = require('rimraf');
const path = require('path')
const mkdir = require('mkdir-promise')
const { exec } = require('child_process');
const {workspacePath} = require('./config');

const InstallPackage = {
    getPath(packageName) {
        return path.join(workspacePath, packageName)
    },

    cleanUpPostBuild(packageName) {
        const installPath = this.getPath(packageName);
        rimraf(installPath, () => {});
        console.log('clean up done;')
    },

    async prepareWorkspace(packageName) {
        const installPath = this.getPath(packageName);
        await mkdir(installPath);
        console.log('workspace created');
    },

    async installPackage(packageName) {
        await InstallPackage.prepareWorkspace(packageName);
        installCommand = `npm install ${packageName}`;
        exec(installCommand, {
                cwd: this.getPath(packageName)
            },
            (err, stdout, stderr) => {
                if(err) {
                    console.log(stderr);
                    InstallPackage.cleanUpPostBuild(packageName);
                } else {
                    console.log('Result command: ', stdout)
                }
            }
        );
    },
}

module.export = InstallPackage;

// InstallPackage.installPackage('mukiyodaplop'); // fail
InstallPackage.installPackage('react'); // OK