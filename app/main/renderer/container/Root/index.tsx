import React from 'react';
import './index.less';
import { Button } from 'antd';
import { useHistory } from 'react-router';

function Root() {
  const history = useHistory();

  const onRouterToLink = (path: string) => {
    history.push(path);
  };

  return (
    <div styleName="app-page">
      <div styleName="button-box">
        <Button type="primary" onClick={() => onRouterToLink('/resume')}>
          像素转换
        </Button>
      </div>
      <div styleName="button-box">
        <Button type="primary" onClick={() => onRouterToLink('/encryption')}>
          加解密测试
        </Button>
      </div>
    </div>
  );
}
export default Root;
