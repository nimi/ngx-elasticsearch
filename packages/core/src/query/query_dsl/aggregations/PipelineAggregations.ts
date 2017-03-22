import { AggsContainer } from './AggsContainer';

export function AvgBucketPipeline(key: string, buckets_path: any) {
  return AggsContainer(key, { buckets_path });
}
