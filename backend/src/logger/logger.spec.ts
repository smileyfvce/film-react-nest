import { JsonLogger } from './json.logger';
import { TskvLogger } from './tskv.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;
  let logSpy: any;
  let errorSpy: any;

  beforeEach(() => {
    logger = new JsonLogger();
    logSpy = jest.spyOn(console, 'log').mockImplementation();
    errorSpy = jest.spyOn(console, 'error').mockImplementation();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('JsonLogger выводит log', () => {
    logger.log('test log');
    const output = logSpy.mock.calls[0][0];
    expect(output).toContain('"level":"log"');
    expect(output).toContain('"message":"test log"');
  });

  it('JsonLogger выводит error', () => {
    logger.error('test error');
    const output = errorSpy.mock.calls[0][0];
    expect(output).toContain('"level":"error"');
    expect(output).toContain('"message":"test error"');
  });
});

describe('TskvLogger', () => {
  let logger: TskvLogger;
  let logSpy: any;
  let errorSpy: any;

  beforeEach(() => {
    logger = new TskvLogger();
    logSpy = jest.spyOn(console, 'log').mockImplementation();
    errorSpy = jest.spyOn(console, 'error').mockImplementation();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('TskvLogger выводит log', () => {
    logger.log('test log');
    const output = logSpy.mock.calls[0][0];
    expect(output).toContain('timestamp=');
    expect(output).toContain('level=log');
    expect(output).toContain('message=test log');
  });
  it('TskvLogger выводит error', () => {
    logger.error('test error');
    const output = errorSpy.mock.calls[0][0];
    expect(output).toContain('timestamp=');
    expect(output).toContain('level=error');
    expect(output).toContain('message=test error');
  })
})