# Getting Started

```
# TODO:
brew install direnv
brew install git-secrets
brew install tfenv
```

## tfenv

```zshrc
export PATH=$PATH ~/.packer/bin
```

install

```
tfenv list-remote
```

use

```
tfenv use
```

tfenv list でローカルのバージョンファイルを確認

terraform init 初期化
terraform apply で適用

## direnv

Add a shell setting.

```zshrc
export EDITOR=code
eval "$(direnv hook zsh)"
```

Type the following command to go to any directories of your choice and set enviroments variables.

```
cd your-directory
direnv edit .
```

Create an `.envrc` file and add environment variables.

```envrc
# ここで設定したTESTはカレントディレクトリ配下のみ有効にできる
export TEST=

export AWS_ACCESS_KEY_ID=
export AWS_SECRET_ACCESS_KEY=
export AWS_DEFAULT_REGION=

# 上位フォルダ環境変数の削除（unset)もできる
unset ABC
```

## plugins

code --install-extension HashiCorp.terraform  
brew install tflint  
[tflint](https://github.com/terraform-linters/tflint)
