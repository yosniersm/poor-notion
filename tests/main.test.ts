
vi.mock('@/router', () => ({
  default: 'router'
}))

vi.mock('pinia', async (originalImport) => {
  const module: any = await originalImport();

  return {
    ...module,
    createPinia: vi.fn().mockReturnValue('pinia')
  }
});

describe('Main', () => {

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const vue = require('vue');
  const useSpy = vi.fn()
  const mountSpy = vi.fn()
  const createAppMock = vi.fn().mockReturnValue({
    use: useSpy,
    mount: mountSpy
  })

  vue.createApp = createAppMock;

  test('should be configure with pinia and router', async () => {
    await import('@/main');

    expect(createAppMock).toHaveBeenCalled();
    expect(mountSpy).toHaveBeenCalledWith('#app');
    expect(useSpy).toHaveBeenCalledWith('pinia');
    expect(useSpy).toHaveBeenCalledWith('router');
  })
})
