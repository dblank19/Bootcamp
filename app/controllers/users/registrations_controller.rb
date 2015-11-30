class Users::RegistrationsController < Devise::RegistrationsController

    def create
        super do |resource|
            if params[:plan]
                resource_plan_id = params[:plan]
                if resource_plan_id == "2"
                    resource.save_with_payment
                else
                    resource.save
                end
            end
        end
    end
    
end
