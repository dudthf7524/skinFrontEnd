import { UserInfo } from "../type/type";
import { Card } from "../ui/card";
type ProfileSettingsProps = {
  userInfoData: UserInfo;
};
export function ProfileSettings({ userInfoData }: ProfileSettingsProps) {
  return (
    <div className="space-y-4">
      <div className="bh-white">
        {/* Profile Information */}
        <Card className="p-6 bg-white">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900">프로필 정보</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm">이름</label>
              <div
                className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive mt-1"
              >
                {userInfoData.name || ''}
              </div>
            </div>
            <div>
              <label className="text-sm">이메일</label>
              <div
                className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive mt-1"
              >
                {userInfoData.email || ''}
              </div>
            </div>
            <div>
              <label className="text-sm">전화번호</label>
              <div
                className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive mt-1"
              >
                {userInfoData.phone || ''}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
