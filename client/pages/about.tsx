import React from "react";
import Layout from "../components/Layout";

export default function AboutPage() {
  return (
    <Layout>
      <div id="About">
        <h1>RC4? What&apos;s that???</h1>
        <p className="mt-3">
          「RC4」は、ストリーム暗号アルゴリズムの一種であり、1987年にロナルド・リベストが開発しました。<br />
          <br />
          RC4アルゴリズムは、秘密鍵を用いてランダムな暗号鍵を生成し、その鍵を用いて平文を暗号化することで通信の機密性を保護します。<br />
          RC4は、高速な暗号化と低いメモリ要件のために、一般的にインターネット上での通信に使用されます。<br />
          <br />
          しかし、RC4にはいくつかのセキュリティ上の問題があることが判明しており、実際には今日では推奨されていません。<br />
          そのため、代替の暗号化アルゴリズムが開発されており、これらが広く使用されています。
        </p>
      </div>
    </Layout>
  );
};
