import {
  Field,
  Float,
  InputType,
  ObjectType,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql';

// see: https://connpass.com/about/api/
// 原点のAPIはsnake_case で返却される

@ObjectType()
@InputType('ConnpassInput')
export class Connpass {
  // イベントID	整数	イベント毎に割り当てられた番号で検索します。複数指定可能です*1	URLが https://connpass.com/event/364/ のイベントの場合、イベントIDは 364 になります。
  eventId: number;
  // キーワード (AND)	文字列(UTF-8)	イベントのタイトル、キャッチ、概要、住所をAND条件部分一致で検索します。複数指定可能です*1
  keyword: string;
  // キーワード (OR)	文字列(UTF-8)	イベントのタイトル、キャッチ、概要、住所をOR条件部分一致で検索します。複数指定可能です*1
  keywordOr: string;
  // イベント開催年月	整数	指定した年月に開催されているイベントを検索します。複数指定可能です*1	yyyymm
  ym: number;
  // イベント開催年月日	整数	指定した年月日に開催されているイベントを検索します。複数指定可能です*1	yyyymmdd
  ymd: number;
  // 参加者のニックネーム	文字列(UTF-8)	指定したニックネームのユーザが参加しているイベントを検索します。複数指定可能です*1
  nickname: string;
  // 管理者のニックネーム	文字列(UTF-8)	指定したニックネームのユーザが管理しているイベントを検索します。複数指定可能です*1
  ownerNickname: string;
  // グループID	整数	グループ 毎に割り当てられた番号で、ひもづいたイベントを検索します。複数指定可能です*1	URLが https://connpass.com/series/1/ のグループの場合、グループIDは 1 になります。
  seriesId: number;
  // 検索の開始位置	整数	検索結果の何件目から出力するかを指定します。	(初期値: 1)
  start: number;
  // 検索結果の表示順	整数	検索結果の表示順を、更新日時順、開催日時順、新着順で指定します。	1: 更新日時順
  order: number;
  // 取得件数	整数	検索結果の最大出力データ数を指定します。	初期値: 10、最小値：1、最大値：100
  count: number;
  // レスポンス形式	文字列(UTF-8)	レスポンスの形式を指定します。
  format: string;
}

@ObjectType('ConnpassEventSeries')
export class ConnpassEventSeries {
  // グループID	1
  id: number;
  // グループタイトル	BPStudy
  title: string;
  // グループのconnpass.com 上のURL	https://connpass.com/series/1/
  url: string;
}

@ObjectType('ConnpassEventResponse')
export class ConnpassEventResponse {
  // イベントID	364
  eventId: number;
  // タイトル	BPStudy#56
  title: string;
  // キャッチ	株式会社ビープラウドが主催するWeb系技術討論の会
  catch: string;
  // 概要(HTML形式)	今回は「Python プロフェッショナル　プログラミング」執筆プロジェクトの継続的ビルドについて、お話しして頂きます。
  description: string;
  // connpass.com 上のURL	https://connpass.com/event/364/
  eventUrl: string;
  // Twitterのハッシュタグ	bpstudy
  hashTag: string;
  // イベント開催日時 (ISO-8601形式)	2012-04-17T18:30:00+09:00
  startedAt: string;
  // イベント終了日時 (ISO-8601形式)	2012-04-17T20:30:00+09:00
  endedAt: string;
  // 定員	80
  limit: number;
  // イベント参加タイプ	participation: connpassで参加受付あり
  eventType: string;
  //
  advertisement: string;
  // グループ
  @Field(() => [ConnpassEventSeries])
  series: ConnpassEventSeries[];
  // 開催場所	東京都豊島区東池袋1-7-12
  address: string;
  // 開催会場	BPオフィス (日産ビルディング7F)
  place: string;
  // 開催会場の緯度	35.680236100000
  @Field(() => Float)
  lat: number;
  // 開催会場の経度	139.701308500000
  @Field(() => Float)
  lon: number;
  // 管理者のID	8
  ownerId: string;
  // 管理者のニックネーム	haru860
  ownerNickname: string;
  // 管理者の表示名	佐藤 治夫
  ownerDisplayName: string;
  // 参加者数	80
  accepted: string;
  // 補欠者数	15
  waiting: string;
  // (UTF-8)	更新日時 (ISO-8601形式)	2012-03-20T12:07:32+09:00
  updatedAt: string;
}

@ObjectType()
export class ConnpassResponse {
  // 含まれる検索結果の件数	1
  resultsReturned: number;
  // 検索結果の総件数	191
  resultsAvailable: number;
  // 検索の開始位置	1
  resultsStart: number;
  // 検索結果のイベントリスト
  @Field(() => [ConnpassEventResponse])
  events: ConnpassEventResponse[];
}

@ObjectType()
@InputType('RawConnpassRequestInput')
export class RawConnpassRequestInput extends PartialType(Connpass, InputType) {}

@ObjectType()
@InputType('ConnpassRequestInput')
export class ConnpassRequestInput extends PartialType(Connpass, InputType) {}

export type ConnpassDistinctKey =
  typeof ConnpassKeyMap[keyof typeof ConnpassKeyMap];

export const ConnpassKeyMap = {
  userId: 'user_id',
  id: 'id',
  categoryId: 'category_id',
  name: 'name',
  location: 'location',
  detail: 'detail',
  begin: 'begin',
  end: 'end',
  isTemporary: 'is_temporary',
  lastUpdate: 'last_update',
  createdDate: 'created_date',
} as const;

registerEnumType(ConnpassKeyMap, {
  name: 'ConnpassKeyMap',
});
