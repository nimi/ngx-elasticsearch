export function TermsQuery(key: string, value:Array<any>){
  return {
    terms:{ [key]: value }
  };
}
