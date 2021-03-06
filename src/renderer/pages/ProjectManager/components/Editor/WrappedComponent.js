import React from "react";
import { Card } from "antd";
import * as UseableComponents from "../../../../../resource/components/index";

function guid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const DraggableComponent = ({
  id,
  children,
  info,
  isPreview,
  onClick,
  onDrop
}) => {
  return (
    <div
      className={[
        "render-component__wrapper",
        "is-inner",
        isPreview ? "is-preview" : ""
      ].join(" ")}
      id={`${id}__wrapper`}
      data-info={info.title}
      onClick={onClick}
      onDragOver={e => {
        e.stopPropagation();
        e.preventDefault();
        return true;
      }}
      onDrop={e => {
        e.stopPropagation();
        onDrop();
      }}
    >
      {children}
    </div>
  );
};

export default function withWrappedComponent({
  type,
  onAdd,
  onDragStart,
  onDrop,
  onSelect
}) {
  const key = `render-component-${type}`;
  const Component = UseableComponents[type];
  const info = Component.componentInfo;
  const defaultProps = Component.defaultProps;
  const props = defaultProps;

  const WrappedComponent = {
    key,
    info,
    type,
    props,
    defaultProps,
    Instance: null
  };

  const hasChildren = props && props.children;

  if (hasChildren) {
    WrappedComponent.children = [];
  }

  const _onSelect = e => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(WrappedComponent);
  };

  const _onDrop = () => {
    WrappedComponent.ley = `render-component-${type}__${guid()}`;
    onDrop(WrappedComponent);
  };

  const Instance = hasChildren
    ? (props = defaultProps) => {
        const isPreview = props.isPreview;
        WrappedComponent.key = props.key || WrappedComponent.key;

        return (
          <Component {...props}>
            <DraggableComponent
              id={key}
              info={info}
              onClick={_onSelect}
              onDrop={() => _onDrop()}
              isPreview={isPreview}
            >
              {WrappedComponent.children.map(Component => {
                return (
                  <Component.Instance
                    {...Component.props}
                    isPreview={isPreview}
                  />
                );
              })}
            </DraggableComponent>
          </Component>
        );
      }
    : (props = defaultProps) => {
        const isPreview = props.isPreview;

        WrappedComponent.key = props.key || WrappedComponent.key;
        return (
          <div
            key={props.key}
            className={[
              "render-component__wrapper",
              isPreview ? "is-preview" : ""
            ].join(" ")}
            id={`${key}__wrapper`}
            data-info={info.title}
            onClick={_onSelect}
          >
            <Component {...props} />
          </div>
        );
      };

  WrappedComponent.Instance = Instance;

  return (
    <Card
      title={info.title}
      bordered={true}
      draggable={true}
      onClick={() => {
        WrappedComponent.key = `render-component-${type}__${guid()}`;
        onAdd(WrappedComponent);
      }}
      onDragStart={e => {
        e.stopPropagation();
        onDragStart(WrappedComponent);
      }}
    >
      <Component />
    </Card>
  );
}
