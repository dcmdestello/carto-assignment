import { Handle, useNodeConnections, type HandleProps } from "@xyflow/react";

export const SingleConnectionHandle = (props: HandleProps) => {
  const connections = useNodeConnections({
    handleType: props.type,
    handleId: props.id ?? undefined,
  });

  return <Handle {...props} isConnectable={connections.length === 0} />;
};
