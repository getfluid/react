/// <reference types="react" />
import { ProjectWithNodes } from 'app/src/types/project';
export { ProjectWithNodes as Project } from 'app/src/types/project';

type ClientParams = {
    clientId: string;
};
declare class Client {
    private clientId;
    constructor({ clientId }: ClientParams);
    getProject(params: QueryParams): Promise<ProjectWithNodes>;
}
type QueryParams = {
    id?: string;
};

type ComponentProps = {
    id?: string;
    initialData?: ProjectWithNodes;
    client: Client;
};
declare function ComponentWithProvider(props: ComponentProps): JSX.Element | null;

declare const useIsMobile: () => boolean;
declare const useIsTablet: () => boolean;
declare const useIsDesktop: () => boolean;

export { Client, ComponentWithProvider as Component, useIsDesktop, useIsMobile, useIsTablet };
