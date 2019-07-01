# Install Azure CLI with apt

If you are running a distribution that comes with `apt`, such as Ubuntu or Debian, there's an x86_64 package available
for the Azure CLI. This package has been tested with and is supported for:

* Ubuntu trusty, xenial, artful, bionic, and disco
* Debian wheezy, jessie, and stretch

!!! info "Note"
    The package for Azure CLI installs its own Python interpreter, and does not use the system Python.

## Install

We offer two ways to install the Azure CLI with distributions that support `apt`: As an all-in-one script that
runs the install commands for you, and instructions that you can run as a step-by-step process on your own.

### Install with one command

We offer and maintain a script which runs all of the installation commands in one step. Run it by using `curl`
and pipe directly to `bash`, or download the script to a file and inspect it before running.

```bash
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

!!! info "Note"
    This script is only verified for Ubuntu 16.04+ and Debian 8+. It may not work on other distributions.
    If you're using a derived distribution such as Linux Mint, follow the manual install instructions and perform
    any necessary troubleshooting.



### Manual install instructions

If you don't want to run a script as superuser, follow these manual steps to install the Azure CLI.

1. Get packages needed for the install process:

    ```
    sudo apt-get update
    sudo apt-get install curl apt-transport-https lsb-release gnupg
    ```

2. Download and install the Microsoft signing key:

    ```
    curl -sL https://packages.microsoft.com/keys/microsoft.asc | \
    gpg --dearmor | \
    sudo tee /etc/apt/trusted.gpg.d/microsoft.asc.gpg > /dev/null
    ```

3. <div id="set-release"/>Add the Azure CLI software repository:

    ```
    AZ_REPO=$(lsb_release -cs)
    echo "deb [arch=amd64] https://packages.microsoft.com/repos/azure-cli/ $AZ_REPO main" | \
    sudo tee /etc/apt/sources.list.d/azure-cli.list
    ```

4. Update repository information and install the `azure-cli` package:

    ```
    sudo apt-get update
    sudo apt-get install azure-cli
    ```

Run the Azure CLI with the `az` command. To sign in, use the `az login` command.

To learn more about different authentication methods, see [Sign in with Azure CLI](https://docs.microsoft.com/en-us/cli/azure/authenticate-azure-cli?view=azure-cli-latest).

## Troubleshooting

Here are some common problems seen when installing with `apt`. If you experience a problem not covered here, [file an issue on github](https://github.com/Azure/azure-cli/issues).

### lsb_release does not return the correct base distribution version

Some Ubuntu- or Debian-derived distributions such as Linux Mint may not return the correct version name from `lsb_release`. This value is used in the install process to
determine the package to install. If you know the code name of the Ubuntu or Debian version your distribution is derived from, you can set the `AZ_REPO` value manually when 
[adding the repository](#set-release). Otherwise, look up information for your distribution on how to determine the base distribution code name and set `AZ_REPO` to the correct value.

### No package for your distribution

Sometimes it may be a while after a distribution is released before there's an Azure CLI package available for it. The Azure CLI designed to be resilient with regards to future
versions of dependencies and rely on as few of them as possible. If there's no package available for your base distribution, try a package for an earlier distribution.

To do this, set the value of `AZ_REPO` manually when [adding the repository](#set-release). For Ubuntu distributions use the `bionic` repository, and for Debian distributions
use `stretch`. Distributions released before Ubuntu Trusty and Debian Wheezy are not supported.

### Proxy blocks connection

If you're unable to connect to an external resource due to a proxy, make sure that you've correctly set the HTTP_PROXY and HTTPS_PROXY variables in your shell. You will need to contact your system administrator to know what host(s) and port(s) to use for these proxies.

These values are respected by many Linux programs, including those which are used in the install process. To set these values:

*No auth*
```
export HTTP_PROXY=http://[proxy]:[port]
export HTTPS_PROXY=https://[proxy]:[port]
```

*Basic auth*
```
export HTTP_PROXY=http://[username]:[password]@[proxy]:[port]
export HTTPS_PROXY=https://[username]:[password]@[proxy]:[port]
```

!!! info "Note"
    If you are behind a proxy, these shell variables must be set to connect to Azure services with the CLI. If you are not using basic auth, it's recommended to export these variables in your .bashrc file. Always follow your business' security policies and the requirements of your system administrator.

You may also want to explicitly configure `apt` to use this proxy at all times. Make sure that the
following lines appear in an `apt` configuration file in `/etc/apt/apt.conf.d/`. We recommend using
either your existing global configuration file, an existing proxy configuration file, `40proxies`,
or `99local`, but follow your system administration requirements.

```apt.conf
Acquire {
    http::proxy "http://[username]:[password]@[proxy]:[port]";
    https::proxy "https://[username]:[password]@[proxy]:[port]";
}
```

If your proxy does not use basic auth, __remove__ the `[username]:[password]@` portion of the proxy URI. If you require more information for proxy configuration, see the official Ubuntu documentation:

* [apt.conf manpage](http://manpages.ubuntu.com/manpages/bionic/en/man5/apt.conf.5.html)
* [Ubuntu wiki - apt-get howto](https://help.ubuntu.com/community/AptGet/Howto#Setting_up_apt-get_to_use_a_http-proxy)

In order to get the Microsoft signing key and get the package from our repository, your proxy needs to
allow HTTPS connections to the following address:

[https://packages.microsoft.com](https://packages.microsoft.com)

### CLI fails to install or run on Windows Subsystem for Linux

Since [Windows Subsystem for Linux (WSL)](https://docs.microsoft.com/en-us/windows/wsl/about) is a system call translation layer on top of the
Windows platform, you might experience an error when trying to install or run the Azure CLI. The CLI relies on
some features that may have a bug in WSL. If you experience an error no matter how you install the CLI,
there's a good chance it's an issue with WSL and not with the CLI install process.

To troubleshoot your WSL installation and possibly resolve issues:

* If you can, run an identical install process on a Linux machine or VM to see if it succeeds. If it does,
  your issue is almost certainly related to WSL. To start a Linux VM in Azure, see the
  [create a Linux VM in the Azure Portal](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/quick-create-portal) documentation.
* Make sure that you're running the latest version of WSL. To get the latest version,
  [update your Windows 10 installation](https://support.microsoft.com/help/4027667/windows-10-update).
* Check for any [open issues](https://github.com/Microsoft/WSL/issues) with WSL which might address your problem.
  Often there will be suggestions on how to work around the problem, or information about a release where 
  the issue will be fixed.
* If there are no existing issues for your problem, [file a new issue with WSL](https://github.com/Microsoft/WSL/issues/new)
  and make sure that you include as much information as possible.

If you continue to have issues installing or running on WSL, consider [installing the CLI for Windows](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-windows?view=azure-cli-latest).

## Update

Use `apt-get upgrade` to update the CLI package.

```
sudo apt-get update && sudo apt-get upgrade
```

!!! info "Note"
    This command upgrades all of the installed packages on your system that have not had a dependency change.
    To upgrade the CLI only, use `apt-get install`.

    ```
    sudo apt-get update && sudo apt-get install --only-upgrade -y azure-cli
    ```

## Uninstall

1. Uninstall with `apt-get remove`:

    ```
    sudo apt-get remove -y azure-cli
    ```

2. If you don't plan to reinstall the CLI, remove the Azure CLI repository information:

    ```
    sudo rm /etc/apt/sources.list.d/azure-cli.list
    ```

3. Remove the signing key:

    ```
    sudo rm /etc/apt/trusted.gpg.d/microsoft.asc.gpg
    ```

4. Remove any unneeded packages:

    ```
    sudo apt autoremove
    ```

!!! info "References"
    For more references, please refer to [Microsoft Documentation - Install Azure CLI with apt](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-apt)
