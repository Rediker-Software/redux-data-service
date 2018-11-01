import { IFieldType } from "./IFieldType";

export const FileField: IFieldType<File> = {
  serialize: true,
  defaultValidationRules: {},
  defaultValue: null,
  isValidType: value => value == null || value instanceof File,
  normalize: (value) => value,
  transform: (file): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();

        reader.onload = function() {
          const arrayBuffer = this.result as ArrayBuffer;
          const uint8Array = new Uint8Array(arrayBuffer);

          resolve(Array.from(uint8Array));
        };

        reader.readAsArrayBuffer(file);
      } catch (e) {
        reject(e);
      }
    });
  },
};
