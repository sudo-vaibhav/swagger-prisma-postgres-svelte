/* tslint:disable */
/* eslint-disable */
/**
 * To-Dos
 * This is a to-do API server. You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: mailvaibhavchopra@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { Configuration } from './configuration';
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface ToDo
 */
export interface ToDo {
    /**
     * 
     * @type {number}
     * @memberof ToDo
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ToDo
     */
    title?: string;
    /**
     * 
     * @type {boolean}
     * @memberof ToDo
     */
    finished?: boolean;
}
/**
 * 
 * @export
 * @interface ToDoRequest
 */
export interface ToDoRequest {
    /**
     * 
     * @type {string}
     * @memberof ToDoRequest
     */
    title: string;
    /**
     * 
     * @type {boolean}
     * @memberof ToDoRequest
     */
    finished?: boolean;
}

/**
 * DefaultApi - axios parameter creator
 * @export
 */
export const DefaultApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * To-do object that needs to be added to the store
         * @summary Add a new to do to the database
         * @param {ToDoPost} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addToDo: async (body?: ToDoPost, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/ToDos`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteToDo: async (id: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('deleteToDo', 'id', id)
            const localVarPath = `/ToDos/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get array of todos from the database
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listToDos: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/ToDos`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = DefaultApiAxiosParamCreator(configuration)
    return {
        /**
         * To-do object that needs to be added to the store
         * @summary Add a new to do to the database
         * @param {ToDoPost} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addToDo(body?: ToDoPost, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ToDo>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.addToDo(body, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteToDo(id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ToDo>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteToDo(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get array of todos from the database
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listToDos(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<ToDo>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listToDos(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * DefaultApi - factory interface
 * @export
 */
export const DefaultApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = DefaultApiFp(configuration)
    return {
        /**
         * To-do object that needs to be added to the store
         * @summary Add a new to do to the database
         * @param {ToDoPost} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addToDo(body?: ToDoPost, options?: any): AxiosPromise<ToDo> {
            return localVarFp.addToDo(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteToDo(id: number, options?: any): AxiosPromise<ToDo> {
            return localVarFp.deleteToDo(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get array of todos from the database
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listToDos(options?: any): AxiosPromise<Array<ToDo>> {
            return localVarFp.listToDos(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI {
    /**
     * To-do object that needs to be added to the store
     * @summary Add a new to do to the database
     * @param {ToDoPost} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public addToDo(body?: ToDoPost, options?: any) {
        return DefaultApiFp(this.configuration).addToDo(body, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public deleteToDo(id: number, options?: any) {
        return DefaultApiFp(this.configuration).deleteToDo(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get array of todos from the database
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public listToDos(options?: any) {
        return DefaultApiFp(this.configuration).listToDos(options).then((request) => request(this.axios, this.basePath));
    }
}

