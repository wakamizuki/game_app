# 使用するベースイメージを指定（Python3.8を使用）
FROM python:3.8-slim

# 作業ディレクトリを作成して設定
WORKDIR /app

# requirements.txtをコンテナ内の作業ディレクトリにコピー
COPY requirements.txt .

# 必要なPythonパッケージをインストール
RUN pip install --no-cache-dir -r requirements.txt

# アプリケーションコードをコンテナ内の作業ディレクトリにコピー
COPY . .

# アプリケーションを起動するコマンドを指定
CMD ["python", "app.py"]
