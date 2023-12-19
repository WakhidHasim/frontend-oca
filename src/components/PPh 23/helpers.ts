import { imageToBase64 } from '../../utils/file';
import { IPPH3FormSchema } from './form-fields';

/**
 * parse couple of things that already covers on the form, this utils has a responsibility to convert current form values
 * to match with the service minimum requirements
 */
export async function parsePPH23RawFormToValidPayload(data: IPPH3FormSchema, type: 'create' | 'edit'): Promise<object> {
  // TODO: amend the form data here to align with the permitted payload based on service documentation
  const validData = { ...data };

  if (validData?.buktiBayar && !!validData.buktiBayar[0]) {
    validData.buktiBayar = await imageToBase64(validData.buktiBayar[0] as unknown as File);
  }

  // i.e. convert the base64 file
  return validData;
}
