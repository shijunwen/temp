import React, { useEffect } from "react";
import { Form, Input, InputNumber } from "antd";
import "./app.less";
import defaultPng from "./EN_0001.png";

const App = (props) => {
  const {
    nodeInfoList = {},
    currentNode,
    obj_id,
    customIcon = {},
    img,
  } = props;
  const [form] = Form.useForm();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const detail = nodeInfoList[currentNode] || {};

  const label = detail.label?.split(":")[1];

  const _updateNode = (obj) => {
    const temp = detail.data || {};
    const detailData = temp.detail;
    detail.data = { ...temp, detail: { ...detailData, ...obj } };
    props.updateNode({ ...detail });
  };

  const onSetLabel = (value) => {
    detail.data.text = {
      internalName: value,
      code: currentNode,
    };

    detail.label = currentNode + ":" + value;
    props.updateNode({ ...detail });
  };

  useEffect(() => {
    const { data = {} } = detail;
    const { compare_type, start_time_field, end_time_field, target_assetId } =
      data.detail || {};
    form.setFieldsValue({
      label,
      compare_type,
      start_time_field,
      end_time_field,
      target_assetId,
    });
  }, [label, form, detail]);

  return (
    <Form form={form}>
      <div className="custom-node">
        <div className="modleTop">
          {customIcon.html ? (
            <div
              className="NodeIcon"
              style={{ marginTop: 6 }}
              dangerouslySetInnerHTML={{ __html: customIcon.html }}
            />
          ) : (
            <img
              className="NodeIcon"
              src={
                img
                  ? `${window.location.origin}/storage_area/ext_plugins/web/${obj_id}/images/${img}`
                  : defaultPng
              }
              alt=""
            />
          )}
          <Form.Item name="label">
            <Input
              placeholder="请输入"
              style={{ marginTop: "15px", width: "200px" }}
              onChange={(e) => onSetLabel(e.target.value)}
            />
          </Form.Item>
        </div>
        <div className="custom-node-content">
          <Form.Item label="时间范围" name="compare_type">
            <InputNumber
              style={{ width: 200 }}
              onChange={(v) => _updateNode({ compare_type: v })}
              min={1}
            />
          </Form.Item>
          <Form.Item label="开始时间字段" name="start_time_field">
            <Input
              style={{ width: "200px" }}
              onChange={(e) =>
                _updateNode({ start_time_field: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="结束时间字段" name="end_time_field">
            <Input
              style={{ width: "200px" }}
              onChange={(e) => _updateNode({ end_time_field: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="目标资产ID" name="target_assetId">
            <Input
              style={{ width: "200px" }}
              onChange={(e) => _updateNode({ target_assetId: e.target.value })}
            />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default App;
