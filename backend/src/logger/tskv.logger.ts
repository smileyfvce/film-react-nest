import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private formatValue(value: string): string {
    if (!value) return '';
    return value.replace(/[\n\t]/g, ' ');
  }
  formatMessage(level: string, message: any, ...optionalParams: any[]): string {
    const date = new Date().toISOString();
    const messageStr =
      typeof message === 'string' ? message : JSON.stringify(message);
    const context = optionalParams[0];
    let result = `timestamp=${date}\tlevel=${level}\tmessage=${this.formatValue(messageStr)}`;
    if(context){
      result += `\tcontext=${this.formatValue(context)};`
    }
    return result + '\n'
  }
  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, ...optionalParams));
  }
  error(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('error', message, ...optionalParams));
  }
  warn(message: any, ...optionalParams: any[]) {
    console.warn(this.formatMessage('warn', message, ...optionalParams));
  }
  debug(message: any, ...optionalParams: any[]) {
    console.debug(this.formatMessage('debug', message, ...optionalParams));
  }
  verbose(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('verbose', message, ...optionalParams));
  }
  fatal(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('fatal', message, ...optionalParams));
  }
}
