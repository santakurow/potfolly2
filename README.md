# Potfolly

ポートフォリオ、技術共有アプリ
自分の作ったポートフォリオあるいは技術記事などを簡単に公開、閲覧ができるアプリです。

## 制作期間
1か月程

## 仕様

### フレームワーク
- Ruby on Rails6 (サーバーサイド)
- React.js (フロントエンド)

### ライブラリ
- Bootstrap
- material-ui
- axios
- jQuery

### DB
- MySQL
- postgresql

### モジュールバンドラー
- Webpack

### テスト
- RSpec
- FactoryBot

### デプロイ
- heroku (本体)
- AWS S3 (画像データ)

## DB設計

![Untitled](https://user-images.githubusercontent.com/29350437/87709302-055f7d80-c7df-11ea-80f2-2fa7e8826859.png)


## 今後の課題
### フロントエンド
- UI/UXの見た目の改善
- コードのリファクタリング
- Reactの新しい機能を使ってみる　（useReducer, useContextなど）
- フロントエンドのテストにjestを使ってみる  
### サーバサイド
- 機能の追加 (例: いいね機能、お気に入り機能、ユーザのフォロー機能など)
- RSpecによるテストコードを詳細に書いてみる  
### インフラ  
- 既存のアプリをDocker化して、ECSでデプロイを試みたが、何回やってもうまく行かず。。　解決作を見つけるまでDockerとAWSの研究を続けてみる
- CircleCIなどのCI/CDパイプラインを組み込んでみる

## 反省点
Railsとreactの連携、webpack、Dockerなど初めての試みが多く、予想以上に時間がかかり過ぎてしまいました。  
また自分の性格上の問題のせいか、最初から完璧を求めすぎて、なかなか完成できないという状態になりがちでした。  
まずは時間配分とタスク配分を考えて、今後は、短期サイクルで開発するようにしたいです。


