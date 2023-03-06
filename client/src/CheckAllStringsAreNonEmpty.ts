
/**
 * 渡された文字列がすべて空文字ではないかどうかを確認する。
 *
 * @param args 確認する文字列（可変長引数）
 * @returns すべての文字列が空文字ではない場合はtrue、それ以外の場合はfalseを返す。
 */
function CheckAllStringsAreNonEmpty(...args: string[]): boolean {
  // 引数のいずれかが空文字列であればfalseを返す。
  for (const str of args) {
    if (str === '') {
      return false;
    }
  }
  return true;
}

export default CheckAllStringsAreNonEmpty;
