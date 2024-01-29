export function largeProfilePic(image: string | null | undefined) {
  if (image) {
    if (image.includes('google')) {
      return image.replace('=s96-c', '');
    } else if (image.includes('facebook')) {
      return image.replace('picture', 'picture?type=large');
    }
  }
  return image;
}

export function shorten(str: string, length: number = 52) {
  if (!str) return '';
  return str.length > length ? str.slice(0, length) + '...' : str;
}

export function variableNameToLabel(str: string) {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

export async function apiFetch<T>(url: string, options?: RequestInit) {
  let formattedUrl = url;
  if (url.startsWith('/')) {
    formattedUrl = url.slice(1);
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/${formattedUrl}`,
    options,
  );
  const data = await res.json();
  return data as T;
}

export function capitalize(str: string) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
