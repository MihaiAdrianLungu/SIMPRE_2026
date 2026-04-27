"use client";

import { Suspense, useState, useEffect } from "react";
import RecordForm from "@/components/RecordForm";
import Spinner from "@/components/Spinner";
import { useRouter, useSearchParams } from "next/navigation";
import { getRecordById, updateRecord } from "@/utils/recordsFunctions";
import { recordDefaultValues } from "@/utils/constants";

const EditContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [entry, setEntry] = useState(recordDefaultValues);
  const [isLoading, setIsLoading] = useState(true);

  const getRecord = async (id) => {
    const data = await getRecordById(id);

    if (data) {
      setEntry(data);
    }

    setIsLoading(false);
  };

  const onSubmit = async (data) => {
    const response = await updateRecord(data);

    if (response) {
        router.push('/');
    } else {
        alert('Failed to update record');
    }
  }

  useEffect(() => {
    const id = searchParams.get("id");

    if (!id) {
      router.push("/");
    } else {
      getRecord(id);
    }
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Edit Record</h1>
      <RecordForm data={entry} onSubmit={onSubmit} />
    </div>
  );
};

const EditRecord = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <EditContent />
    </Suspense>
  );
};

export default EditRecord;
