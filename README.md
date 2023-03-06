# RC4-chat-room

🌵🌵🌵 RC4暗号を使用して特定のキーを持っているユーザのみがメッセージを読めるチャットルームです。  

![成果物](./docs/img/fruit.gif)  

## 実行方法

```shell
docker build -t rc4-chat-room .
docker run -itd -p 8000:8000 --name my-rc4-chat-room rc4-chat-room
```

## 開発環境の構築

### クライアント

```shell
yarn --pwd ./client install
yarn --pwd ./client dev
```

### サーバ

```shell
dotnet run --project ./server
```
