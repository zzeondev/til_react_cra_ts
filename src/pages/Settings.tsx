// 여러 개의 테마 적용하기
function setTheme(themeName: string) {
  const root = document.documentElement;
  root.classList.remove('theme-dark', 'theme-ocean', 'theme-hc');
  if (themeName == 'light') {
    // root.classList.add('theme-light');
  }
  if (themeName == 'dark') {
    root.classList.add('theme-dark');
  }
  if (themeName == 'ocean') {
    root.classList.add('theme-ocean');
  }
  if (themeName == 'hc') {
    root.classList.add('theme-hc');
  }
}

function Settings() {
  return (
    <div className="container-app py-8">
      {/* 여러개 테마 토글 버튼 */}
      <button className="rounded border border-borderc px-3 py-1" onClick={() => setTheme('light')}>
        Light
      </button>
      <button className="rounded border border-borderc px-3 py-1" onClick={() => setTheme('dark')}>
        Dark
      </button>
      <button className="rounded border border-borderc px-3 py-1" onClick={() => setTheme('ocean')}>
        Ocean
      </button>
      <button className="rounded border border-borderc px-3 py-1" onClick={() => setTheme('hc')}>
        High Contrast
      </button>
    </div>
  );
}

export default Settings;
