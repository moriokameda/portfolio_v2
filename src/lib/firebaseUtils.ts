import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export async function getImageUrl(path: string): Promise<string> {
  try {
    const imageRef = ref(storage, path);
    return await getDownloadURL(imageRef);
  } catch (error) {
    console.error('Error getting image URL:', error);
    throw error;
  }
}
