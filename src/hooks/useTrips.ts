import { useState, useEffect, useCallback } from "react";
import {
    db,
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp,
    deleteDoc,
    doc
} from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";

export interface FirestoreTrip {
    id: string;
    userId: string;
    title: string;
    destination: string;
    startDate: string;
    endDate: string;
    imageUrl: string;
    totalBudget?: string;
    status: "upcoming" | "completed" | "planning" | "suggested";
    likes?: number;
    isLiked?: boolean;
    createdAt: any;
    itineraryData?: any; // Store full JSON
}

export const useTrips = () => {
    const { user } = useAuth();
    const [trips, setTrips] = useState<FirestoreTrip[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Subscribe to trips
    useEffect(() => {
        if (!user) {
            setTrips([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        // Use subcollection users/{userId}/trips instead of root trips
        const tripsRef = collection(db, "users", user.uid, "trips");
        const q = query(
            tripsRef,
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const fetchedTrips: FirestoreTrip[] = [];
                snapshot.forEach((doc) => {
                    fetchedTrips.push({ id: doc.id, ...doc.data() } as FirestoreTrip);
                });
                setTrips(fetchedTrips);
                setLoading(false);
            },
            (err) => {
                console.error("Error fetching trips:", err);
                setError("Failed to load trips.");
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [user]);

    // Save a new trip
    const saveTrip = useCallback(
        async (tripData: Partial<FirestoreTrip>, itinerary: any) => {
            if (!user) throw new Error("User must be logged in to save trips.");

            try {
                // Save to subcollection
                const tripsRef = collection(db, "users", user.uid, "trips");
                await addDoc(tripsRef, {
                    ...tripData,
                    userId: user.uid,
                    itineraryData: itinerary,
                    status: "upcoming",
                    likes: 0,
                    isLiked: false,
                    createdAt: serverTimestamp(),
                });
                return true;
            } catch (err) {
                console.error("Error saving trip:", err);
                throw err;
            }
        },
        [user]
    );

    // Delete a trip
    const deleteTrip = useCallback(async (tripId: string) => {
        if (!user) return; // Need user to know path
        try {
            await deleteDoc(doc(db, "users", user.uid, "trips", tripId));
        } catch (err) {
            console.error("Error deleting trip:", err);
            throw err;
        }
    }, [user]);

    return { trips, loading, error, saveTrip, deleteTrip };
};
