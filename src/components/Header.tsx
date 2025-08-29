
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold py-4">API Doc Viewer App</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>New Project</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create a new project</DialogTitle>
              <DialogDescription>
                Give your project a name to get started.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Project Name
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button>Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
