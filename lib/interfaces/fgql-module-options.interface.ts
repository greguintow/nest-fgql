import { ExecutableSchemaTransformation } from '@graphql-tools/schema';
import { IResolvers, IResolverValidationOptions } from '@graphql-tools/utils';
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { MercuriusOptions } from 'mercurius';
import { GraphQLSchema } from 'graphql';
import { DefinitionsGeneratorOptions } from '../graphql-ast.explorer';
import { BuildSchemaOptions } from './build-schema-options.interface';

export interface FgqlModuleOptions
  extends Omit<MercuriusOptions, 'schema' | 'resolvers'> {
  schema?: GraphQLSchema;
  resolvers?: IResolvers;
  typeDefs?: string | string[];
  typePaths?: string[];
  transformSchema?: (
    schema: GraphQLSchema,
  ) => GraphQLSchema | Promise<GraphQLSchema>;
  definitions?: {
    path?: string;
    outputAs?: 'class' | 'interface';
  } & DefinitionsGeneratorOptions;
  autoSchemaFile?: string | boolean;
  buildSchemaOptions?: BuildSchemaOptions;
  include?: Function[];
  schemaDirectives?: Record<string, any>;
  schemaTransforms?: ExecutableSchemaTransformation[];
  resolverValidationOptions?: IResolverValidationOptions;
  directiveResolvers?: any;
  /**
   * Sort the schema lexicographically
   */
  sortSchema?: boolean;
  /**
   * Enable/disable enhancers for @ResolveField()
   */
  fieldResolverEnhancers?: Enhancer[];
  /**
   * Apply `transformSchema` to the `autoSchemaFile`
   */
  transformAutoSchemaFile?: boolean;
}

export type Enhancer = 'guards' | 'interceptors' | 'filters';

export interface GqlOptionsFactory {
  createGqlOptions(): Promise<FgqlModuleOptions> | FgqlModuleOptions;
}

export interface GqlModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<GqlOptionsFactory>;
  useClass?: Type<GqlOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<FgqlModuleOptions> | FgqlModuleOptions;
  inject?: any[];
}
