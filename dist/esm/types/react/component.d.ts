/// <reference types="react" />
import Client from "../client";
import { Project } from "../types";
import "./component.css";
type ComponentProps = {
    id?: string;
    initialData?: Project;
    client: Client;
};
export default function ComponentWithProvider(props: ComponentProps): JSX.Element | null;
export declare const DESKTOP_COLS = 48;
export declare const TABLET_COLS = 32;
export declare const MOBILE_COLS = 16;
export {};
