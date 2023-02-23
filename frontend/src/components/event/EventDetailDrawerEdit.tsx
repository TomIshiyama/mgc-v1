// import {
//     Autocomplete,
//     Box,
//     Container,
//     TextField,
//     ToggleButton,
//     ToggleButtonGroup
// } from "@mui/material";
// import React from "react";
// import { Controller, useForm } from "react-hook-form";
// import { useDecoderQuery, useGetEventAllQuery } from "../../generated/graphql";
// import { validationRules } from "../../pages/signin";
// import { COLOR } from "../../utils/styling";
// import { TemporaryDrawer } from "../common/TemporaryDrawer";

// export type BasicButtonType = {
//     label: string;
//     onClick?: MUIProps.ButtonProps["onClick"];
//     color?: MUIProps.ButtonProps["color"];
//     sx?: MUIProps.ButtonProps["sx"];
//     variant?: MUIProps.ButtonProps["variant"];
//     disabled?: MUIProps.ButtonProps["disabled"];
//     options?: Omit<MUIProps.ButtonProps, "onClick" | "color" | "sx" | "variant">;
// };

// export type DetailDrawerProps = Omit<TemporaryDrawerProps, "children"> & {
//     title: string;
//     subTitle?: string;
//     max?: MUIProps.AvatarGroupProps["max"];
//     beginDate?: string | Date;
//     endDate?: string | Date;
//     beginTime?: string | Date;
//     endTime?: string | Date;
//     description?: string;
//     category: EventCategoryType;
//     chipLabel: string;
//     avatarList?: {
//         alt: MUIProps.AvatarProps["alt"];
//         src: MUIProps.AvatarProps["src"];
//     }[];
//     buttonList?: BasicButtonType[];
//     avatarSize?: number; // TODO: 定数化する
//     location?: string;
//     onClickJoin?: MUIProps.ButtonProps["onClick"];
// };

// const commonMap: {
//     stack: MUIProps.StackProps;
// } = {
//     stack: { direction: "row", spacing: 1 },
// };

// export type EventDetailDrawerEditProps = { key?: React.Key };

// type FormInputList = {
//     categoryId: number;
//     name: string;
//     location: string;
//     detail: string;
//     begin: Date;
//     end: Date;
// };

// export const DetailDrawer: React.VFC<DetailDrawerProps> = ({
//     title,
//     subTitle,
//     max,
//     beginDate,
//     endDate,
//     beginTime,
//     endTime,
//     description,
//     category,
//     chipLabel,
//     avatarList,
//     avatarSize,
//     location,
//     buttonList,
//     onClickJoin,
//     ...temporaryDrawerProps
// }) => { const { handleSubmit, control } = useForm<FormInputList>({
//         mode: "onChange",
//     });

//     const { data: eventData } = useGetEventAllQuery();
//     const additionalOptions =
//         eventData?.getEventAll.map((event) => ({
//             label: event.location,
//         })) ?? [];
//     const { data } = useDecoderQuery();

//     const onSubmit = (data: FormInputList) => {
//         console.log(data);
//     };

//     return (
//         <>
//             <TemporaryDrawer {...temporaryDrawerProps}>
//                 <Box
//                     sx={{
//                         minHeight: "calc(100vh - 10em)", // FIXME: 動的に対応
//                         display: "flex",
//                         flexDirection: "column",
//                         justifyContent: "space-between",
//                         maxWidth: DRAWNER.maxWidth,
//                         minWidth: DRAWNER.minWidth,
//                     }}
//                     className="event-detail-drawer__wrapper"
//                 >
//                     {/* top side */}

//                     <EventDetailDrawerEdit />
//                     {/* bottom side */}
//                     <Box>
//                         <Stack
//                             {...commonMap.stack}
//                             margin="1em 0"
//                             justifyContent="space-between"
//                         >
//                             <AvatarGroup max={max}>
//                                 {avatarList?.map((avatar, idx) => (
//                                     <Avatar
//                                         key={idx}
//                                         alt={avatar.alt}
//                                         src={avatar.src}
//                                         sx={
//                                             avatarSize
//                                                 ? {
//                                                       width: avatarSize,
//                                                       height: avatarSize,
//                                                   }
//                                                 : {}
//                                         }
//                                     />
//                                 ))}
//                             </AvatarGroup>
//                             <Button color="primary" size="small" onClick={onClickJoin}>
//                                 {avatarList?.length}人参加中
//                             </Button>
//                         </Stack>
//                         <Stack spacing={2}>
//                             {buttonList?.map(({ label, options, ...props }) => (
//                                 <Button
//                                     // Propsをデフォルトと差分更新して渡す
//                                     {...{
//                                         ...{ size: "large", variant: "contained" },
//                                         ...{ ...props, ...options },
//                                     }}
//                                 >
//                                     {label}
//                                 </Button>
//                             ))}
//                         </Stack>
//                     </Box>
//                 </Box>
//             </TemporaryDrawer>
//         </>
//     );
// };

// const DetailDrawerEditForms = () => {

// return (

// <Box component="form" onSubmit={handleSubmit(onSubmit)}>
// <Container>
//     <Controller
//         name="name"
//         control={control}
//         rules={validationRules.familyKana}
//         render={({ field, fieldState }) => (
//             <TextField
//                 {...field}
//                 type="text"
//                 label="イベント名称"
//                 autoComplete={field.name}
//                 fullWidth
//                 error={fieldState.invalid}
//                 helperText={fieldState.error?.message}
//                 margin="dense"
//                 size="small"
//             />
//         )}
//     />

//     <Controller
//         name="categoryId"
//         control={control}
//         rules={validationRules.division}
//         render={({ field, fieldState }) => (
//             <ToggleButtonGroup
//                 {...field}
//                 sx={{
//                     "& .css-1gjgmky-MuiToggleButtonGroup-root .MuiToggleButtonGroup-grouped":
//                         {
//                             borderRadius: ".5em",
//                         },
//                 }}
//             >
//                 {data?.decoder?.category?.map((code, index) => (
//                     <ToggleButton
//                         key={index}
//                         value={code.code}
//                         sx={{
//                             width: "6em",
//                             height: "20px",
//                             bgcolor: COLOR[code.code],
//                             margin: "0 4px",
//                         }}
//                         size="small"
//                     >
//                         {code.name}
//                     </ToggleButton>
//                 ))}
//             </ToggleButtonGroup>
//         )}
//     />
//     <Controller
//         name="location"
//         control={control}
//         rules={validationRules.location}
//         render={({ field, fieldState }) => (
//             <Autocomplete
//                 options={[
//                     { label: "zoom" },
//                     { label: "meet" },
//                     ...additionalOptions,
//                 ]}
//                 value={field.value}
//                 // {...field}
//                 disablePortal
//                 // options={top100Films}
//                 sx={{ width: 300 }}
//                 renderInput={(params) => (
//                     <TextField
//                         {...params}
//                         label="開催場所"
//                         size="small"
//                     />
//                 )}
//             />
//         )}
//     />

//     <Controller
//         name="detail"
//         control={control}
//         rules={validationRules.givenName}
//         render={({ field, fieldState }) => (
//             <TextField
//                 {...field}
//                 type="textarea"
//                 label="イベント詳細"
//                 autoComplete={field.name}
//                 fullWidth
//                 error={fieldState.invalid}
//                 helperText={fieldState.error?.message}
//                 margin="dense"
//                 size="small"
//             />
//         )}
//     />
//     <Controller
//         name="begin"
//         control={control}
//         rules={validationRules.givenKana}
//         render={({ field, fieldState }) => (
//             <TextField
//                 label="開始日時"
//                 type="datetime-local"
//                 // defaultValue={}
//                 size="small"
//                 sx={{ width: 250 }}
//                 InputLabelProps={{
//                     shrink: true,
//                 }}
//                 // TODO: InputProps
//             />
//         )}
//     />
//     <Controller
//         name="end"
//         control={control}
//         rules={validationRules.givenKana}
//         render={({ field, fieldState }) => (
//             <TextField
//                 label="終了日時"
//                 type="datetime-local"
//                 // defaultValue={}
//                 size="small"
//                 sx={{ width: 250 }}
//                 InputLabelProps={{
//                     shrink: true,
//                 }}
//                 inputProps={{
//                     step: "900", // 5 min
//                 }}
//             />
//         )}
//     />
// </Container>
// </Box>
// )
// }
