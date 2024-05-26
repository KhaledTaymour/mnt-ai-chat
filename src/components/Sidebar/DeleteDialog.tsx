import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StoreActions } from "@/types/chat";
import { useContext } from "react";
import { ChatDispatchContext } from "@/contexts/ChatContext";

type DeleteDialogProps = {
  conversationKey: string;
};
function DeleteDialog({ conversationKey }: DeleteDialogProps) {
  const dispatch = useContext(ChatDispatchContext);

  function deleteConverstation({
    conversationKey,
  }: {
    conversationKey: string;
  }) {
    dispatch({
      type: StoreActions.DELETE_CHAT,
      chatID: conversationKey,
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="p-1 hover:bg-transparent"
          title="Delete"
        >
          <Trash className="h-4 w-4 hover:fill-slate-100" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Conversation</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this converstation?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="default"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                deleteConverstation({ conversationKey });
              }}
            >
              Yes
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteDialog;
