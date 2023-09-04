export function setFocus(target: HTMLDivElement) {
  const range = document.createRange();
  range.selectNodeContents(target);
  range.collapse(false);
  const sel = window.getSelection();
  sel && sel.removeAllRanges();
  sel && sel.addRange(range);
}

export function createDate(time: string) {
  const date = new Date(time);
  return (
    date.getFullYear() +
    ' ' +
    date.getMonth() +
    ' ' +
    date.getDay() +
    ' ' +
    date.getHours() +
    ':' +
    date.getMinutes()
  );
}

export function capitalize(string: string) {
  return 'set' + string.charAt(0).toUpperCase() + string.slice(1);
}

export function prepareActions(data: [key: string, value: string | number | boolean][]) {
  return data.map(([key, value]) => {
    return {
      action: capitalize(key),
      [key]: value,
    };
  });
}
