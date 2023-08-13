import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { ScrollArea } from "@/components/ui/ScrollArea";

export default function RecentlyPlayedCard() {
  return (
    <Card className="md:row-span-3 h-fit md:h-auto row-start-4 col-start-1 md:col-start-3 col-span-3 md:col-span-1 md:row-start-1">
      <CardHeader>
        <CardTitle>Recently played</CardTitle>
        <CardDescription>List of your recently played quizzes</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[250px]">
          <div className="space-y-5">
            <p>dasdsad</p>
            <p>dasdsad</p>
            <p>dasdsad</p>
            <p>dasdsad</p>
            <p>dasdsad</p>
            <p>dasdsad</p>
            <p>dasdsad</p>
            <p>dasdsad</p>
            <p>dasdsad</p>
            <p>dasdsad</p>
            <p>dasdsad</p>
            <p>dasdsad</p>
            <p>dasdsad</p>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
