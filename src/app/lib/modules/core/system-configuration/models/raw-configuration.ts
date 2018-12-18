import { RawConfigurationItem } from './raw-configuration-item';

export class RawConfiguration {
    Reference: string;
    Version: string;
    Items: Array<RawConfigurationItem>;
}