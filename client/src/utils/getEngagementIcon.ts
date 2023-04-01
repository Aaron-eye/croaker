import getTemplate from "./getTemplate";

const engagementIcons: any = {};

export default async (engagementType: string) => {
  if (!engagementIcons[engagementType]) {
    engagementIcons[engagementType as keyof Object] = await getTemplate(
      `/icons/icon`,
      { iconId: engagementType }
    );
    engagementIcons[`${engagementType as keyof Object}-solid`] =
      await getTemplate(`/icons/icon`, { iconId: `${engagementType}-solid` });
  }

  return engagementIcons[engagementType];
};
