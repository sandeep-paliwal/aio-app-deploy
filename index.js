const core = require('@actions/core')
const execSync = require('child_process').execSync

try {
  const namespace = core.getInput('AIO_RUNTIME_NAMESPACE');
  const auth = core.getInput('AIO_RUNTIME_AUTH')
  
  if(!namespace || !auth)
    throw new Error("AIO_RUNTIME_NAMESPACE and AIO_RUNTIME_AUTH must be passed to the action")

  process.env.AIO_RUNTIME_NAMESPACE = namespace
  process.env.AIO_RUNTIME_AUTH = auth

  let options = {
      stdio: 'inherit',
      env: process.env
  }
  execSync('sudo --preserve-env aio app deploy --skip-build', options)

} catch (error) {
  core.setFailed(error.message)
}
