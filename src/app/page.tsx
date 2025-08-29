
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome to the API Doc Viewer App
        </h2>
        <p className="text-muted-foreground mt-2">
          Create a new project to get started.
        </p>
      </div>

      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Upload API Documentation</CardTitle>
          <CardDescription>Upload your .yaml or .json API specification files here.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input id="picture" type="file" multiple accept=".yaml,.json" />
        </CardContent>
        <CardFooter>
          {/* Buttons or drag-and-drop area can go here later */}
        </CardFooter>
      </Card>
    </div>
  );
}
