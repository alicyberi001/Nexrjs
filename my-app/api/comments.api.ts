import { urls } from "./urls";
import { generateClient } from "./client";
import { listsLimit } from "../utils/config";
import { IComments } from "../types/comments.type";
import { IPagination, IResDto } from "../types/global.type";

interface IFetchPostCommentsReqDto extends IPagination {
  postId: number;
}
interface IFetchPostCommentsResDto extends IResDto {
  comments: IComments[];
}
type fetchPostComments = (
  _: IFetchPostCommentsReqDto
) => Promise<IFetchPostCommentsResDto>;
export const fetchPostComments: fetchPostComments = async ({
  postId,
  ...params
}) => {
  const client = generateClient();
  const response = await client.get<IFetchPostCommentsResDto>(
    urls.comments.byPostId(postId),
    {
      params: { limit: params?.limit || listsLimit, skip: params?.skip || 0 },
    }
  );
  return response.data;
};