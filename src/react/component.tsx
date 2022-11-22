import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import React, { FC } from "react";
import Client from "../client";
import { Project, NodeWithChildren, Node as NodeType } from "../types";
import { useIsMobile, useIsTablet } from "./hooks";

import "./component.css";

type ComponentProps = {
  id?: string;
  initialData?: Project;
  client: Client;
};

// TODO fix the context... for some reason its not working
// const context = createContext<QueryClient | undefined>(undefined);
const queryClient = new QueryClient();

export default function ComponentWithProvider(props: ComponentProps) {
  if (!props.id) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...props} />
    </QueryClientProvider>
  );
}

const Component = ({ id, initialData, client }: ComponentProps) => {
  const { data, isLoading } = useQuery(
    ["component", id],
    () => client.getProject({ id }),
    {
      initialData,
    }
  );

  if (!data || isLoading) return <></>;

  return (
    <>
      {data?.nodes?.map((node) => (
        <Node data={node} key={node.id} />
      ))}
    </>
  );
};

type NodeProps = { data: NodeWithChildren };

const Node: FC<NodeProps> = ({ data }) => {
  const { keyPrefix, isMobile, isTablet } = useNodeKeys();
  const getNodeCols = () => {
    if (isMobile) return MOBILE_COLS;
    if (isTablet) return TABLET_COLS;
    return DESKTOP_COLS;
  };

  const rowHeight = data.rowHeight - data.rowGap;
  const cols = getNodeCols();
  const rows = data.rows;

  if (data.type === "GRID" && data.children?.length > 0)
    return (
      <section
        style={{
          width: "100%",
          backgroundColor: data?.backgroundColor
            ? data?.backgroundColor
            : "transparent",
        }}
      >
        <div
          style={{
            maxWidth: data?.maxWidth ? data.maxWidth : "none",
            margin: "auto",
            display: "grid",
            rowGap: data.rowGap,
            columnGap: data.colGap,
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, ${rowHeight}px)`,
          }}
        >
          {data?.children?.map((node) => (
            <div
              style={{
                position: "relative",
                gridColumnStart: node?.[`${keyPrefix}X`],
                gridColumnEnd: node?.[`${keyPrefix}W`],
                gridRowStart: node?.[`${keyPrefix}Y`],
                gridRowEnd: node?.[`${keyPrefix}H`],
              }}
              key={node.id}
            >
              <Node data={node} />
            </div>
          ))}
        </div>
      </section>
    );

  if (data?.type === "BUTTON")
    return data.href ? (
      <a href={data.href}>
        <button
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: data.backgroundColor ?? "transparent",
            color: data.color ?? "#000000",
          }}
        >
          <span
            style={{ textAlign: "center" }}
            dangerouslySetInnerHTML={{ __html: data.text ?? "" }}
          />
        </button>
      </a>
    ) : (
      <button
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: data.backgroundColor ?? "transparent",
          color: data.color ?? "#000000",
        }}
      >
        <span
          style={{ textAlign: "center" }}
          dangerouslySetInnerHTML={{ __html: data.text ?? "" }}
        />
      </button>
    );

  if (data?.type === "IMAGE")
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt={data?.alt ?? ""}
        style={{ objectFit: "cover", height: "100%", width: "100%" }}
        src={data?.src ?? ""}
      />
    );

  if (data?.type === "VIDEO")
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <video
        autoPlay
        loop
        controls={false}
        muted
        style={{ objectFit: "cover", height: "100%", width: "100%" }}
        src={data?.src ?? ""}
      />
    );

  if (data?.type === "BOX")
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: data?.backgroundColor ?? "transparent",
        }}
      />
    );

  return (
    <span
      style={{
        textAlign: (data?.textAlign as "left" | "center" | "right") ?? "left",
        fontSize: data?.variant?.[`${keyPrefix}FontSize`] ?? 16,
        fontWeight: data?.variant?.[`${keyPrefix}FontWeight`] ?? "regular",
        color: data?.color ?? "inherit",
      }}
      dangerouslySetInnerHTML={{ __html: data?.text ?? "" }}
    />
  );
};

type NodeGridKeys = Pick<
  NodeType,
  | "tabletH"
  | "tabletW"
  | "tabletX"
  | "tabletY"
  | "mobileH"
  | "mobileW"
  | "mobileX"
  | "mobileY"
  | "desktopH"
  | "desktopW"
  | "desktopX"
  | "desktopY"
>;

const useNodeKeys = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const keyPrefix = isMobile ? "mobile" : isTablet ? "tablet" : "desktop";

  const wKey = `${keyPrefix}W`;
  const hKey = `${keyPrefix}H`;
  const xKey = `${keyPrefix}X`;
  const yKey = `${keyPrefix}Y`;

  return { hKey, wKey, xKey, yKey, keyPrefix, isMobile, isTablet } as {
    hKey: keyof NodeGridKeys;
    wKey: keyof NodeGridKeys;
    yKey: keyof NodeGridKeys;
    xKey: keyof NodeGridKeys;
    keyPrefix: "mobile" | "tablet" | "desktop";
    isMobile: boolean;
    isTablet: boolean;
  };
};

export const DESKTOP_COLS = 48;
export const TABLET_COLS = 32;
export const MOBILE_COLS = 16;
