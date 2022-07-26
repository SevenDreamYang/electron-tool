import React, { useState, useMemo } from 'react';
import JSEncrypt from 'jsencrypt';
import CryptoJS from 'crypto-js';
import './index.less';
import { Input, PageHeader, Col, Divider, Row, Typography, Button } from 'antd';
const { TextArea } = Input;
const { Text } = Typography;

import { useHistory } from 'react-router';

function Rsa() {
  const [publicKey, setPublicKey] = React.useState('');
  const [privateKey, setPrivateKey] = React.useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [rsaText, setRsaText] = React.useState('');
  const [rsaResult, setRsaResult] = React.useState('');
  const [encryptData, setEncryptData] = React.useState('');
  const [encryptResult, setEncryptResult] = React.useState('');
  const encryptRSA = () => {
    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(publicKey);
    const res = encryptor.encrypt(rsaText);
    setRsaResult(res.toString());
  };

  const decryptRSA = () => {
    const encryptor = new JSEncrypt();
    encryptor.setPrivateKey(privateKey);
    const res = encryptor.decrypt(encryptData);
    setEncryptResult(res.toString());
  };

  const generateRSAKeys = () => {
    setLoading(true);
    const crypt = new JSEncrypt({ default_key_size: '1024' });
    crypt.getKey(() => {
      let publicKey = crypt.getPublicKeyB64();
      let privateKey = crypt.getPrivateKeyB64();
      setPublicKey(publicKey);
      setPrivateKey(privateKey);
      setLoading(false);
    });
  };

  return (
    <div styleName="box">
      <Row gutter={16} justify="space-around" align="middle">
        <Col span={11}>
          <Text>RSA公钥匙</Text>
          <TextArea
            size="large"
            value={publicKey}
            style={{ width: '100%' }}
            autoSize={{ minRows: 5, maxRows: 5 }}
            onChange={({ target: { value } }) => setPublicKey(value)}
          />
        </Col>
        <Col span={11}>
          <Text>RSA私钥匙</Text>
          <TextArea
            size="large"
            value={privateKey}
            style={{ width: '100%' }}
            autoSize={{ minRows: 5, maxRows: 5 }}
            onChange={({ target: { value } }) => setPrivateKey(value)}
          />
        </Col>
        <Col span={2}>
          <Button type="primary" onClick={generateRSAKeys} loading={loading}>
            生成钥匙对
          </Button>
        </Col>
      </Row>
      <Row gutter={16} justify="space-around" align="middle">
        <Col span={11}>
          <Text>RSA测试文字</Text>
          <TextArea
            size="large"
            value={rsaText}
            style={{ width: '100%' }}
            autoSize={{ minRows: 2, maxRows: 2 }}
            onChange={({ target: { value } }) => setRsaText(value)}
          />
        </Col>
        <Col span={11}>
          <Text>RSA加密结果</Text>
          <TextArea
            size="large"
            value={rsaResult}
            readOnly
            style={{ width: '100%' }}
            autoSize={{ minRows: 2, maxRows: 2 }}
          />
        </Col>
        <Col span={2}>
          <Button type="primary" onClick={encryptRSA}>
            RSA加密
          </Button>
        </Col>
      </Row>
      <Row gutter={16} justify="space-around" align="middle">
        <Col span={11}>
          <Text>RSA加密文字</Text>
          <TextArea
            size="large"
            value={encryptData}
            style={{ width: '100%' }}
            autoSize={{ minRows: 2, maxRows: 2 }}
            onChange={({ target: { value } }) => setEncryptData(value)}
          />
        </Col>
        <Col span={11}>
          <Text>RSA解密结果</Text>
          <TextArea
            size="large"
            value={encryptResult}
            readOnly
            style={{ width: '100%' }}
            autoSize={{ minRows: 2, maxRows: 2 }}
          />
        </Col>
        <Col span={2}>
          <Button type="primary" onClick={decryptRSA}>
            RSA加密
          </Button>
        </Col>
      </Row>
    </div>
  );
}

function Aes() {
  const [aesKey, setAesKey] = React.useState('');
  const [aesBaseKey, setAesBaseKey] = React.useState('');

  const [testText, setTestText] = React.useState('');
  const [encryptData, setEncryptData] = React.useState('');
  const [wantEncryptData, setWantEncryptData] = React.useState('');
  const [result, setResult] = React.useState('');
  const [needTest, setNeedTest] = React.useState('');
  const [needTestResult, setNeedTestResult] = React.useState('');

  const generateAESKey = () => {
    const key = [];
    for (let i = 0; i < 32; i++) {
      const num = Math.floor(Math.random() * 26);
      const charStr = String.fromCharCode(97 + num);
      key.push(charStr.toUpperCase());
    }
    const aesKey = key.join('');
    setAesKey(aesKey);
  };

  const encryptText = () => {
    const key = needTest;
    const _key = CryptoJS.enc.Utf8.parse(key);
    const res = CryptoJS.enc.Base64.stringify(_key);
    setNeedTestResult(res);
  };

  const encryptRSA = () => {
    const $data = CryptoJS.enc.Utf8.parse(testText);
    const key = aesKey;
    const _key = CryptoJS.enc.Utf8.parse(key);
    // AES加密
    const result = CryptoJS.AES.encrypt($data, _key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7, // 偏移量。使用非补码方式时，需要使用ZeroPadding。默认为PKCS5Padding。
    });
    // base64转码
    const Base64 = CryptoJS.enc.Base64.stringify(result.ciphertext);
    const Base64key = CryptoJS.enc.Base64.stringify(_key);
    setAesBaseKey(Base64key);
    setEncryptData(Base64);
  };

  const decodeAES = () => {
    const $wantEncryptData = wantEncryptData.replace(/\n/g, '').replace(/-/g, '+').replace(/_/g, '/');
    const decrypt = CryptoJS.AES.decrypt($wantEncryptData, CryptoJS.enc.Base64.parse(aesBaseKey), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7, // 偏移量。使用非补码方式时，需要使用ZeroPadding。默认为PKCS5Padding。
    });
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    console.log(decryptedStr);
    setResult(decryptedStr);
  };

  return (
    <div styleName="box">
      <Row gutter={16} justify="space-around" align="middle">
        <Col span={22}>
          <Input
            addonBefore="AES钥匙"
            size="large"
            value={aesKey}
            style={{ width: '100%' }}
            onChange={({ target: { value } }) => setAesKey(value)}
          />
        </Col>
        <Col span={2}>
          <Button type="primary" onClick={generateAESKey}>
            生成AES钥匙
          </Button>
        </Col>
      </Row>
      <Row gutter={16} justify="space-around" align="middle">
        <Col span={11}>
          <Text>AES测试文字</Text>
          <TextArea
            size="large"
            value={testText}
            style={{ width: '100%' }}
            autoSize={{ minRows: 2, maxRows: 2 }}
            onChange={({ target: { value } }) => setTestText(value)}
          />
        </Col>
        <Col span={11}>
          <Text>加密数据</Text>
          <TextArea
            size="large"
            value={encryptData}
            readOnly
            style={{ width: '100%' }}
            autoSize={{ minRows: 2, maxRows: 2 }}
          />
        </Col>
        <Col span={2}>
          <Button type="primary" onClick={encryptRSA}>
            AES加密
          </Button>
        </Col>
      </Row>
    </div>
  );
}

function Encryption() {
  const history = useHistory();

  return (
    <div styleName="app-page">
      <PageHeader onBack={() => history.push('/')} title="加解密测试" subTitle="RSA、AES" />
      <Divider orientation="left">RES</Divider>
      <Rsa />
      <Divider orientation="left">AES</Divider>
      <Aes />
    </div>
  );
}

export default Encryption;
