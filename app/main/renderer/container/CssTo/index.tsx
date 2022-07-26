import React, { useState, useMemo } from 'react';
import './index.less';
import { Input, PageHeader, Col, Divider, Row, InputNumber } from 'antd';
import { useHistory } from 'react-router';
function CssTo() {
  const history = useHistory();
  const [decimal, setDecimal] = useState(4);
  const [screenWidth, setScreenWidth] = useState(1920);
  const [caleWidth, setCaleWidth] = useState(1);
  const [screenHeight, setScreenHeigh] = useState(1080);
  const [caleHeigh, setCaleHeigh] = useState(1);
  const [layoutSize, setLayoutSize] = useState(750);
  const [actualSize, setActualSize] = useState(375);
  const [caleRemPx, setCaleRemPx] = useState(1);

  const caleWidthResult = useMemo(() => {
    const $1vw = screenWidth / 100;
    return (caleWidth / $1vw).toFixed(decimal);
  }, [screenWidth, caleWidth, decimal]);

  const caleHeighResult = useMemo(() => {
    const $1vh = screenHeight / 100;
    return (caleHeigh / $1vh).toFixed(decimal);
  }, [screenHeight, caleHeigh, decimal]);

  const fontSizeCale = useMemo(() => (actualSize / layoutSize) * 100, [layoutSize, actualSize]);

  const caleRemPxhResult = useMemo(
    () => (caleRemPx / fontSizeCale).toFixed(decimal),
    [caleRemPx, fontSizeCale, decimal]
  );

  return (
    <div styleName="app-page">
      <PageHeader onBack={() => history.push('/')} title="像素转换" subTitle="px To vw，px To rem" />
      <Divider orientation="left">公共配置</Divider>
      <div styleName="box">
        <Row gutter={16}>
          <Col span={8}>
            <InputNumber
              size="large"
              addonBefore="保留小数点"
              value={decimal}
              max={6}
              min={1}
              style={{ width: '100%' }}
              onChange={(e) => setDecimal(e)}
            />
          </Col>
        </Row>
      </div>
      <Divider orientation="left">px To vw</Divider>
      <div styleName="box">
        <Row gutter={16}>
          <Col span={8}>
            <InputNumber
              size="large"
              addonBefore="屏幕宽度"
              min={1}
              value={screenWidth}
              style={{ width: '100%' }}
              onChange={(e) => setScreenWidth(e)}
            />
          </Col>
          <Col span={8}>
            <InputNumber
              size="large"
              addonBefore="换算值"
              min={1}
              value={caleWidth}
              style={{ width: '100%' }}
              onChange={(e) => setCaleWidth(e)}
            />
          </Col>
          <Col span={8}>
            <Input size="large" addonBefore="结果" readOnly value={caleWidthResult} style={{ width: '100%' }} />
          </Col>
        </Row>
      </div>
      <Divider orientation="left">px To vh</Divider>
      <div styleName="box">
        <Row gutter={16}>
          <Col span={8}>
            <InputNumber
              size="large"
              min={1}
              addonBefore="屏幕高度"
              value={screenHeight}
              style={{ width: '100%' }}
              onChange={(e) => setScreenHeigh(e)}
            />
          </Col>
          <Col span={8}>
            <InputNumber
              size="large"
              min={1}
              addonBefore="换算值"
              value={caleHeigh}
              style={{ width: '100%' }}
              onChange={(e) => setCaleHeigh(e)}
            />
          </Col>
          <Col span={8}>
            <Input size="large" addonBefore="结果" readOnly value={caleHeighResult} style={{ width: '100%' }} />
          </Col>
        </Row>
      </div>
      <Divider orientation="left">px To rem</Divider>
      <div styleName="box">
        <Row gutter={16}>
          <Col span={8}>
            <InputNumber
              size="large"
              addonBefore="设计稿宽度"
              value={layoutSize}
              style={{ width: '100%' }}
              onChange={(e) => setLayoutSize(e)}
            />
          </Col>
          <Col span={8}>
            <InputNumber
              size="large"
              addonBefore="实际宽度"
              value={actualSize}
              style={{ width: '100%' }}
              onChange={(e) => setActualSize(e)}
            />
          </Col>
          <Col span={8}>
            <Input size="large" addonBefore="字体大小" disabled value={fontSizeCale} style={{ width: '100%' }} />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <InputNumber
              size="large"
              addonBefore="换算值"
              value={caleRemPx}
              style={{ width: '100%' }}
              onChange={(e) => setCaleRemPx(e)}
            />
          </Col>
          <Col span={8}>
            <Input size="large" addonBefore="结果" readOnly value={caleRemPxhResult} style={{ width: '100%' }} />
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default CssTo;
