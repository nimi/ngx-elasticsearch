export function TermQuery(key: string, value: any){
  return {
    term:{ [key]:value }
  };
}
