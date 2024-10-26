import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function DeleteModal({
  isOpen,
  setIsOpen,
  queryKey,
  id,
  deleteFn,
  queryKeyOptions = null,
}) {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: async () => {
      deleteFn(id);
    },
    onSuccess: () => {
      const key =
        queryKeyOptions === false ? `${queryKey},${queryKeyOptions}` : queryKey;

      console.log(typeof key, key);

      queryClient.setQueryData([key], async (oldData: any) => {
        console.log(oldData);
        if (!oldData) {
          return null;
        }
        return oldData.filter((item: any) => item.id !== id);
      });
      setIsOpen(false);
    },
    onError: (error) => {
      alert(error.message);
    },
    onSettled: () => {},
  });

  const handleDelete = async () => {
    deleteMutation.mutate();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="flex flex-col items-center justify-center w-[60%] max-w-[600px] mx-auto rounded-xl">
        <DialogTitle className="text-center text-xs mt-2">
          정말 삭제 하시겠습니까?
        </DialogTitle>
        <DialogDescription>
          <button
            type="submit"
            className="text-black border border-black px-8 rounded-full text-[10px]"
            onClick={handleDelete}
          >
            네
          </button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
