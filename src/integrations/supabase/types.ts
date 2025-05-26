export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      audits: {
        Row: {
          address: string | null
          amount_of_borrowing: number | null
          appointment_date: string | null
          attended_agm: boolean | null
          auditor_name: string | null
          auditor_type: string | null
          branch_office_address: string | null
          cessation_date: string | null
          cessation_type: string | null
          city: string | null
          company_id: string | null
          country: string | null
          created_at: string | null
          duration_of_appointment: string | null
          email_id: string | null
          end_date: string | null
          firm_registration_number: string | null
          id: string
          membership_number: string | null
          mode_of_appointment: string | null
          net_profit: number | null
          net_worth: number | null
          paid_up_capital: number | null
          pan_of_firm: string | null
          pan_of_signing_partner: string | null
          phone_number: string | null
          pin_code: string | null
          reserves_and_surplus: number | null
          srn_of_adt: string | null
          start_date: string | null
          state: string | null
          turnover: number | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          amount_of_borrowing?: number | null
          appointment_date?: string | null
          attended_agm?: boolean | null
          auditor_name?: string | null
          auditor_type?: string | null
          branch_office_address?: string | null
          cessation_date?: string | null
          cessation_type?: string | null
          city?: string | null
          company_id?: string | null
          country?: string | null
          created_at?: string | null
          duration_of_appointment?: string | null
          email_id?: string | null
          end_date?: string | null
          firm_registration_number?: string | null
          id?: string
          membership_number?: string | null
          mode_of_appointment?: string | null
          net_profit?: number | null
          net_worth?: number | null
          paid_up_capital?: number | null
          pan_of_firm?: string | null
          pan_of_signing_partner?: string | null
          phone_number?: string | null
          pin_code?: string | null
          reserves_and_surplus?: number | null
          srn_of_adt?: string | null
          start_date?: string | null
          state?: string | null
          turnover?: number | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          amount_of_borrowing?: number | null
          appointment_date?: string | null
          attended_agm?: boolean | null
          auditor_name?: string | null
          auditor_type?: string | null
          branch_office_address?: string | null
          cessation_date?: string | null
          cessation_type?: string | null
          city?: string | null
          company_id?: string | null
          country?: string | null
          created_at?: string | null
          duration_of_appointment?: string | null
          email_id?: string | null
          end_date?: string | null
          firm_registration_number?: string | null
          id?: string
          membership_number?: string | null
          mode_of_appointment?: string | null
          net_profit?: number | null
          net_worth?: number | null
          paid_up_capital?: number | null
          pan_of_firm?: string | null
          pan_of_signing_partner?: string | null
          phone_number?: string | null
          pin_code?: string | null
          reserves_and_surplus?: number | null
          srn_of_adt?: string | null
          start_date?: string | null
          state?: string | null
          turnover?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audits_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          active_compliance: string | null
          address: string | null
          annual_filing_date: string | null
          authorized_capital: number | null
          branches: Json | null
          category: string | null
          cin: string | null
          city: string | null
          class: string | null
          corporate_relations: Json | null
          country: string | null
          created_at: string | null
          date_of_incorporation: string | null
          email: string | null
          id: string
          last_agm_date: string | null
          listed_status: string | null
          name: string
          paid_up_capital: number | null
          phone_number: string | null
          pin_code: string | null
          registration_number: string | null
          registrations: Json | null
          roc_code: string | null
          state: string | null
          sub_category: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          active_compliance?: string | null
          address?: string | null
          annual_filing_date?: string | null
          authorized_capital?: number | null
          branches?: Json | null
          category?: string | null
          cin?: string | null
          city?: string | null
          class?: string | null
          corporate_relations?: Json | null
          country?: string | null
          created_at?: string | null
          date_of_incorporation?: string | null
          email?: string | null
          id?: string
          last_agm_date?: string | null
          listed_status?: string | null
          name: string
          paid_up_capital?: number | null
          phone_number?: string | null
          pin_code?: string | null
          registration_number?: string | null
          registrations?: Json | null
          roc_code?: string | null
          state?: string | null
          sub_category?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          active_compliance?: string | null
          address?: string | null
          annual_filing_date?: string | null
          authorized_capital?: number | null
          branches?: Json | null
          category?: string | null
          cin?: string | null
          city?: string | null
          class?: string | null
          corporate_relations?: Json | null
          country?: string | null
          created_at?: string | null
          date_of_incorporation?: string | null
          email?: string | null
          id?: string
          last_agm_date?: string | null
          listed_status?: string | null
          name?: string
          paid_up_capital?: number | null
          phone_number?: string | null
          pin_code?: string | null
          registration_number?: string | null
          registrations?: Json | null
          roc_code?: string | null
          state?: string | null
          sub_category?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      directors: {
        Row: {
          address: string | null
          city: string | null
          companies: Json | null
          company_id: string | null
          country: string | null
          created_at: string | null
          date_of_appointment: string | null
          date_of_birth: string | null
          date_of_cessation: string | null
          designation: string | null
          din: string | null
          email: string | null
          experience: string | null
          first_name: string
          has_interest_in_other_entities: boolean | null
          id: string
          last_name: string
          middle_name: string | null
          nationality: string | null
          occupation: string | null
          other_directorships: string | null
          other_entities: Json | null
          phone_number: string | null
          pin_code: string | null
          prefix: string | null
          qualification: string | null
          state: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          companies?: Json | null
          company_id?: string | null
          country?: string | null
          created_at?: string | null
          date_of_appointment?: string | null
          date_of_birth?: string | null
          date_of_cessation?: string | null
          designation?: string | null
          din?: string | null
          email?: string | null
          experience?: string | null
          first_name: string
          has_interest_in_other_entities?: boolean | null
          id?: string
          last_name: string
          middle_name?: string | null
          nationality?: string | null
          occupation?: string | null
          other_directorships?: string | null
          other_entities?: Json | null
          phone_number?: string | null
          pin_code?: string | null
          prefix?: string | null
          qualification?: string | null
          state?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          companies?: Json | null
          company_id?: string | null
          country?: string | null
          created_at?: string | null
          date_of_appointment?: string | null
          date_of_birth?: string | null
          date_of_cessation?: string | null
          designation?: string | null
          din?: string | null
          email?: string | null
          experience?: string | null
          first_name?: string
          has_interest_in_other_entities?: boolean | null
          id?: string
          last_name?: string
          middle_name?: string | null
          nationality?: string | null
          occupation?: string | null
          other_directorships?: string | null
          other_entities?: Json | null
          phone_number?: string | null
          pin_code?: string | null
          prefix?: string | null
          qualification?: string | null
          state?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "directors_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      share_capital_members: {
        Row: {
          aadhar: string | null
          address: string | null
          category: string | null
          city: string | null
          company_id: string | null
          country: string | null
          created_at: string | null
          din: string | null
          email: string | null
          face_value: number | null
          folio_number: string | null
          holding_percentage: number | null
          id: string
          name: string
          nationality: string | null
          pan: string | null
          phone_number: string | null
          pin_code: string | null
          share_type: string | null
          shares_held: number | null
          state: string | null
          updated_at: string | null
        }
        Insert: {
          aadhar?: string | null
          address?: string | null
          category?: string | null
          city?: string | null
          company_id?: string | null
          country?: string | null
          created_at?: string | null
          din?: string | null
          email?: string | null
          face_value?: number | null
          folio_number?: string | null
          holding_percentage?: number | null
          id?: string
          name: string
          nationality?: string | null
          pan?: string | null
          phone_number?: string | null
          pin_code?: string | null
          share_type?: string | null
          shares_held?: number | null
          state?: string | null
          updated_at?: string | null
        }
        Update: {
          aadhar?: string | null
          address?: string | null
          category?: string | null
          city?: string | null
          company_id?: string | null
          country?: string | null
          created_at?: string | null
          din?: string | null
          email?: string | null
          face_value?: number | null
          folio_number?: string | null
          holding_percentage?: number | null
          id?: string
          name?: string
          nationality?: string | null
          pan?: string | null
          phone_number?: string | null
          pin_code?: string | null
          share_type?: string | null
          shares_held?: number | null
          state?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "share_capital_members_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
